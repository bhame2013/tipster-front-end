import { OpenAPIObject, SchemaObject } from '../openapi-interfaces'

const mapOpenApiTypeToTS: any = (prop: any, array: any) => {
  if ((array && prop.$ref) || prop?.$ref) {
    return prop.$ref.replace('#/components/schemas/', '')
  }

  // Handle oneOf and anyOf for union types
  if (prop.oneOf && Array.isArray(prop.oneOf)) {
    const types = prop.oneOf.map((schema: any) => mapOpenApiTypeToTS(schema, false))
    return types.join(' | ')
  }

  if (prop.anyOf && Array.isArray(prop.anyOf)) {
    const types = prop.anyOf.map((schema: any) => mapOpenApiTypeToTS(schema, false))
    return types.join(' | ')
  }

  if (Array.isArray(prop.enum) && prop.enum.length > 0) {
    const union = prop.enum
      .map((v: any) => (typeof v === 'string' ? `'${v}'` : String(v)))
      .join(' | ')
    return union
  }
  switch (prop.type) {
    case 'string':
  
      return 'string'
    case 'integer':
      if (prop.format === 'int32') {
        return 'number'
      }
      return 'number'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'array':
      return `${mapOpenApiTypeToTS(prop.items, true)}[]`
    case 'object':
      if (prop.additionalProperties) {
        const valueType = mapOpenApiTypeToTS(prop.additionalProperties, false)
        return `Record<string, ${valueType}>`
      }
      return 'Record<string, any>'
    default:
      if (prop?.allOf?.[0]?.['$ref']) {
        const name = prop.allOf[0]['$ref'].replace('#/components/schemas/', '')
        return name
      }
      return 'any'
  }
}

export function generateInterfacesOpenApi(openApiDocument: OpenAPIObject) {
  const schemas = openApiDocument?.components?.schemas

  return Object.keys(schemas || {})
    .map((schemaName) => {
      const schema = (schemas as any)[schemaName] as SchemaObject
      const properties = schema.properties || {}
      const required = schema.required || []

      const propertiesLines = Object.keys(properties)
        .map((propName) => {
          const prop = properties[propName]
          const tsType = mapOpenApiTypeToTS(prop, false)
          const isRequired = required.includes(propName) ? '' : '?'

          return `  ${propName}${isRequired}: ${tsType};`
        })
        .join('\n')

      return `export interface ${schemaName} {\n${propertiesLines}\n}`
    })
    .join('\n\n')
}
