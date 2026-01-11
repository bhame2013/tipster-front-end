import { createClient } from "@/hook/use-swagger";
import type { Swagger  } from "./swagger_client";

export const tipsterBackend = createClient<Swagger, string>({});

import * as TipsterBackendTypes from "./swagger_client";

export { TipsterBackendTypes };
