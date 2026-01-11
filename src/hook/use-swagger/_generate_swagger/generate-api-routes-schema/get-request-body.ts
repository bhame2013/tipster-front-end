import {
  OperationObject,
  RequestBodyObject,
  SchemaObject,
  ReferenceObject
} from "../openapi-interfaces";

function formatType(schema: SchemaObject, isRequired: boolean): string {
  if (schema.type === 'array') {
    const itemsType = formatType(schema.items as SchemaObject, true)
    return isRequired ? `${itemsType}[]` : `${itemsType}[] | undefined`
  }

  if (schema.type === 'object') {
    if (schema.additionalProperties) {
      const valueType = formatType(schema.additionalProperties as SchemaObject, true)
      return isRequired ? `Record<string, ${valueType}>` : `Record<string, ${valueType}> | undefined`
    }
    return isRequired ? 'object' : 'object | undefined'
  }

  switch (schema.type) {
    case 'integer':
      // Handle integer formats like int32
      if (schema.format === 'int32') {
        return isRequired ? 'number' : 'number | undefined'
      }
      return isRequired ? 'number' : 'number | undefined'
    case 'string':
      return isRequired ? 'string' : 'string | undefined'
    case 'boolean':
      return isRequired ? 'boolean' : 'boolean | undefined'
    default:
      return isRequired ? 'any' : 'any | undefined'
  }
}

export function getRequestBody(methodInfo: OperationObject) {
  const requestBody = methodInfo?.requestBody as RequestBodyObject;
  const schemaBody = requestBody?.content?.["application/json"]?.schema as SchemaObject | ReferenceObject;

  if (!schemaBody) {
    return null;
  }

  // If it's a reference, return it as is
  if ('$ref' in schemaBody) {
    return schemaBody;
  }

  // If it's an object with properties, format each property
  if (schemaBody.type === 'object' && schemaBody.properties) {
    const formattedProperties = Object.entries(schemaBody.properties).reduce((acc, [key, value]) => {
      acc[key] = formatType(value as SchemaObject, schemaBody.required?.includes(key) ?? false);
      return acc;
    }, {} as Record<string, string>);

    return formattedProperties;
  }

  // For other types, format the schema directly
  return formatType(schemaBody, true);
}
