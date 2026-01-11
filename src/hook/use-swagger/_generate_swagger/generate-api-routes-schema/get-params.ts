import { OperationObject, ParameterObject, SchemaObject } from '../openapi-interfaces'

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
    case 'number':
      return isRequired ? 'number' : 'number | undefined'
    case 'string':
      // Handle date-time format
      if (schema.format === 'date-time' || schema.format === 'date') {
        return isRequired ? 'Date' : 'Date | undefined'
      }
      return isRequired ? 'string' : 'string | undefined'
    case 'boolean':
      return isRequired ? 'boolean' : 'boolean | undefined'
    default:
      return isRequired ? 'any' : 'any | undefined'
  }
}

function setNestedValue(obj: any, path: string, value: any) {
  const parts = path.split('.')
  let current = obj

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!current[part]) {
      current[part] = {}
    }
    current = current[part]
  }

  current[parts[parts.length - 1]] = value
}

export function getParams(methodInfo: OperationObject) {
  const params = methodInfo?.parameters || []
  const result: Record<string, any> = {}

  params.forEach((param: any) => {
    const paramObject = param as ParameterObject
    const typedParam = paramObject?.schema as SchemaObject
    const isRequired = paramObject.required ?? false
    const formattedType = formatType(typedParam, isRequired)

    // Handle nested properties by creating nested objects
    if (param.name.includes('.')) {
      setNestedValue(result, param.name, formattedType)
    } else {
      result[param.name] = formattedType
    }
  })

  return result
}
