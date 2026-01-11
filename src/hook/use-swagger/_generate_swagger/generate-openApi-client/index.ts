import {
  SchemaObject,
  ReferenceObject,
} from "../openapi-interfaces";
import { MethodsRouteApi, RouteApi } from "../generate-api-routes-schema";

// Convert an OpenAPI schema (or reference) into a valid TypeScript type string.
function convertSchemaToTs(
  schema?: SchemaObject | ReferenceObject,
  indent = 0
): string {
  const space = (lvl: number) => "  ".repeat(lvl);

  if (!schema) return "any";

  // Handle plain object mapping (already processed params/request body)
  if (typeof schema === "object" && !Array.isArray(schema) && !(schema as any)["type"] && !(schema as any)["$ref"]) {
    const props = Object.entries(schema as Record<string, any>)
      .map(([k, v]) => {
        const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : `'${k}'`;
        const valueTs = Array.isArray(v)
          ? v.length
            ? `${convertSchemaToTs(v[0] as any, indent + 2)}[]`
            : "any[]"
          : typeof v === "string"
          ? (() => {
              const raw = v.trim();
              const primitiveRegex = /^(string|number|boolean|any|unknown|void|never|object|Record<.*>|Date)$/;
              const looksLikeType = primitiveRegex.test(raw) || raw.includes(" | ") || raw.includes("<") || raw.includes("| undefined") || raw.includes("[");
              return looksLikeType ? raw : `'${raw.replace(/'/g, "\\'")}'`;
            })()
          : typeof v === "number" || typeof v === "bigint"
          ? `${v}`
          : typeof v === "boolean"
          ? `${v}`
          : typeof v === "object"
          ? convertSchemaToTs(v as any, indent + 2)
          : "any";
        return `${space(indent + 1)}${safeKey}: ${valueTs};`;
      })
      .join("\n");
    return `{
${props}
${space(indent)}}`;
  }

  // Handle $ref references
  if ((schema as any)["$ref"]) {
    return (schema as ReferenceObject)["$ref"].replace(
      "#/components/schemas/",
      ""
    );
  }

  const s = schema as SchemaObject;

  // Arrays
  if (s.type === "array" && s.items) {
    return `${convertSchemaToTs(s.items as any, indent)}[]`;
  }

  // Objects
  if (s.type === "object" || s.properties || s.additionalProperties) {
    // Dictionaries (additionalProperties)
    if (s.additionalProperties) {
      const valueTs = convertSchemaToTs(s.additionalProperties as any, indent + 1);
      return `Record<string, ${valueTs}>`;
    }

    // Regular object with defined props
    if (s.properties) {
      const props = Object.entries(s.properties)
        .map(([key, value]) => {
          const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
            ? key
            : `'${key}'`;
          return `${space(indent + 1)}${safeKey}: ${convertSchemaToTs(
            value as any,
            indent + 1
          )};`;
        })
        .join("\n");
      return `{
${props}
${space(indent)}}`;
    }

    // Fallback to generic object
    return "Record<string, any>";
  }

  // Primitive & formatted types
  switch (s.type) {
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "string":
      if (s.format === "date-time" || s.format === "date") {
        return "Date";
      }
      return "string";
    default:
      // allOf with single reference
      if (s.allOf?.[0] && (s.allOf[0] as any)["$ref"]) {
        return (s.allOf[0] as ReferenceObject)["$ref"].replace(
          "#/components/schemas/",
          ""
        );
      }
      return "any";
  }
}

function generateMethodsString(methods: RouteApi[MethodsRouteApi]): string {
  return (Object.keys(methods) as MethodsRouteApi[])
    .map((method) => {
      const { params, requestBody, result } = methods[method];

      const paramsString = params ? convertSchemaToTs(params as any, 3) : "null";
      const requestBodyString = requestBody
        ? convertSchemaToTs(requestBody as any, 3)
        : "null";
      const resultString = result ? convertSchemaToTs(result as any, 3) : "null";

      return `    ${method}: {\n      params: ${paramsString},\n      requestBody: ${requestBodyString},\n      result: ${resultString}\n    }`;
    })
    .join(",\n");
}

export function generateOpenApiClient(
  routesApi: RouteApi,
  interfacesOpenApi: string
): string {
  const apiLiteral = Object.keys(routesApi)
    .map((path) => {
      const methods = routesApi[path];

      return `  "${path}": {\n${generateMethodsString(methods)}\n  }`;
    })
    .join(",\n");

  return `export type Swagger = {\n${apiLiteral}\n};\n\n${interfacesOpenApi}`;
}
