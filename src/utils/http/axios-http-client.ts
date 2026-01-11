import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  UnexpectedError,
  ValidationError,
} from "./errors";

import { HttpRequest, HttpResponse, HttpStatusCode } from "./interfaces";

function buildUrl(url: string, params?: Record<string, any>): string {
  if (!params) return url;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

export async function request(payload: HttpRequest): Promise<HttpResponse> {
  const method = payload.method.toUpperCase();

  const newBody = payload.body
    ? Object.fromEntries(
        Object.entries(payload.body).filter(
          ([_, value]) => value !== null && value !== undefined
        )
      )
    : undefined;

  const isGetOrDelete = method === "GET" || method === "DELETE";
  const finalUrl = isGetOrDelete ? buildUrl(payload.url, newBody) : payload.url;

  const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...payload.headers,
    },
    signal: payload.signal,
  };

  if (!isGetOrDelete && newBody) {
    fetchOptions.body = JSON.stringify(newBody);
  }

  if (payload.cacheOptions) {
    if (payload.cacheOptions.cache) {
      fetchOptions.cache = payload.cacheOptions.cache;
    }
    if (payload.cacheOptions.next) {
      fetchOptions.next = payload.cacheOptions.next;
    }
  }

  let status: number;
  let data: any;

  try {
    const response = await fetch(finalUrl, fetchOptions);
    status = response.status;

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else if (payload.responseType === "blob") {
      data = await response.blob();
    } else if (payload.responseType === "arraybuffer") {
      data = await response.arrayBuffer();
    } else {
      data = await response.text();
      try {
        data = JSON.parse(data);
      } catch {
        // keep as text
      }
    }
  } catch (error) {
    status = 500;
    data = { message: "An unexpected error occurred" };
  }

  switch (status) {
    case HttpStatusCode.ok:
      return data;

    case HttpStatusCode.notModified:
      return data;

    case HttpStatusCode.okNoContent:
      return data;

    case HttpStatusCode.okPost:
      return data;

    case HttpStatusCode.okCreated:
      return data;

    case HttpStatusCode.unauthorized: {
      throw new UnauthorizedError({ code: "401", message: "" });
    }

    case HttpStatusCode.unprocessableEntity:
      if (data?.errors) {
        throw data;
      }

      throw new ValidationError(data.validationErrors);

    case HttpStatusCode.conflict:
      throw new ConflictError({ message: data.message, code: "409" });

    case HttpStatusCode.badRequest:
      throw new BadRequestError({
        message: data.message,
        code: data?.code || "400",
      });

    case HttpStatusCode.notFound:
      throw new BadRequestError({ message: data.message, code: "404" });

    case HttpStatusCode.serverError:
      throw new UnexpectedError("");

    default: {
      throw new BadRequestError({
        data,
        message: data?.message || "Internal Server Error - " + payload.url,
        code: "500",
      });
    }
  }
}
