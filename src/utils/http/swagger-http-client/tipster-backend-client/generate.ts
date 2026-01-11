import { generateSwaggerTypes } from "@/hook/use-swagger/_generate_swagger";

import fs from "fs";

generateSwaggerTypes({
  fs,
  fsPath:
    "./src/utils/http/swagger-http-client/tipster-backend-client/swagger_client.ts",
    swaggerUrl: "https://tipsters-backend.vercel.app/swagger-json"
});
