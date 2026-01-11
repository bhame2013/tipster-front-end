import { request } from "./axios-http-client";
import { requestServer } from "@/server/http-client";

import type { HttpRequest } from "./interfaces";

export async function api<T = unknown>(params: HttpRequest, basePath?: string) {
  const url = `https://tipsters-backend.vercel.app/${params.url}`;

  if (params.server) {
    const response = await requestServer({ ...params, url });
    return response as T;
  } else {
    const response = await request({ ...params, url });
    return response as T;
  }
}
