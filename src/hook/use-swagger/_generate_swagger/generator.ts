
import { OpenAPIObject } from './openapi-interfaces'

import { generateOpenApiClient } from './generate-openApi-client'
import { generateApiRoutesSchema } from './generate-api-routes-schema/generator'
import { generateInterfacesOpenApi } from './generate-interfaces-openApi'

export async function generateSwaggerTypes({
  fs,
  fsPath = './swagger_client.ts',
  swaggerUrl,
  openApiDocument,
}: {
  fs: any,
  fsPath?: string
  openApiDocument?: OpenAPIObject
  swaggerUrl?: string
}) {
  try {

  let openApiDocumentFinal: any = openApiDocument

  if (!openApiDocument && !swaggerUrl) {
    throw new Error('Either openApiDocument or swaggerUrl must be provided.')
  }

  console.log(swaggerUrl)

  if (swaggerUrl) {
    if (swaggerUrl.startsWith('http://') || swaggerUrl.startsWith('https://')) {
      console.log("UE CARALHO")
      const response = await fetch(swaggerUrl)
      console.log(response, "POOORA")
      if (!response.ok) {
        throw new Error(`Failed to fetch Swagger document: ${response.statusText}`)
      }
      openApiDocumentFinal = await response.json()
    } else {
      openApiDocumentFinal = JSON.parse(fs.readFileSync(swaggerUrl, 'utf-8'))
    }
  }

  const apiRoutesSchema = generateApiRoutesSchema(openApiDocumentFinal)

  const interfacesOpenApi = generateInterfacesOpenApi(openApiDocumentFinal)

  const combinedOutput = generateOpenApiClient(apiRoutesSchema, interfacesOpenApi)

  console.log(combinedOutput)

  fs.writeFileSync(fsPath, combinedOutput, 'utf-8')
  }catch(err) {
    console.log("ERROR", err)
  }

}
