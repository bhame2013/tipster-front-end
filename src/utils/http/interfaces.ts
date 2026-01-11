import { ValidationErrorModel } from "./errors"

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type NextCacheOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export type HttpCacheOptions = {
  cache?: RequestCache;
  next?: NextCacheOptions;
};

export type HttpRequest = {
  server?: boolean;
  url: string
  method: HttpMethod
  body?: any 
  headers?: any
  arrayFormat?: "repeat" | "brackets"
  responseType?: "json" | "blob" | "text" | "arraybuffer"
  fullPath?: string;
  debugMode?: boolean;
  serverContext?: any;
  signal?: AbortSignal;
  cacheOptions?: HttpCacheOptions;
}

export enum HttpStatusCode {
  ok = 200,
  okCreated = 201,
  okPost = 202,
  okNoContent = 204,
  notModified = 304,
  notFound = 404,
  noContent = 204,
  forbidden = 403,
  badRequest = 400,
  serverError = 500,
  conflict = 409,
  unauthorized = 401,
  unprocessableEntity = 422
}

export type HttpResponse<T = any> = {
  data: T
  status: HttpStatusCode
  message?: string | null;
  validationErros?: ValidationErrorModel
} & T

export type HttpResponseResult<R = any> = Promise<HttpResponse<R>>

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => HttpResponseResult<R>
}


