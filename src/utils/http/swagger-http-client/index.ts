import { api } from "../api";

import { tipsterBackend } from "./tipster-backend-client";

export * from "./tipster-backend-client"

export const httpClient = {
    default: api,
    tipsterBackend: tipsterBackend.client
}

