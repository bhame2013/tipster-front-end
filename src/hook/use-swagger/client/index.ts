import { api } from "../../../utils/http/api";
import type { HttpCacheOptions } from "../../../utils/http/interfaces";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
  ? T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : DeepPartial<T[P]>
  : T[P];
};

type Client<Swagger> = {
  client: <Url extends keyof Swagger, Method extends keyof Swagger[Url]>(args: {
    url: Url;
    method: Method;
    payload?: DeepPartial<Omit<Swagger[Url][Method], "result">>;
    headers?: Record<string, string>;
    signal?: AbortSignal;
    arrayFormat?: "repeat" | "brackets";
    isMock?: boolean;
    server?: boolean;
    cacheOptions?: HttpCacheOptions;
  }) => Promise<Swagger[Url][Method] extends { result: infer R } ? R : never>;
};

type CreateClientReturn<Swagger, TBase> = TBase extends string
  ? Client<Swagger>
  : TBase extends Record<string, string>
  ? { [K in keyof TBase]: Client<Swagger> }
  : Client<Swagger>;

export function createClient<
  Swagger,
  TBase extends string | Record<string, string> | undefined
>({
  basePath,
  customBody,
  customHeaders,
}: {
  basePath?: TBase;
  customBody?: () => Record<string, string>;
  customHeaders?: () => Record<string, string>;
}): CreateClientReturn<Swagger, TBase> {
  function replaceUrlParams<Url extends string>(
    url: Url,
    params?: Record<string, any>,
    arrayFormat?: "repeat" | "brackets"
  ): string {
    if (!params) return url.slice(1);

    const usedParams = new Set<string>();

    const replacedUrl = url
      .replace(/\{(\w+)\}/g, (_, key) => {
        if (params[key] !== undefined) {
          usedParams.add(key);
          return encodeURIComponent(params[key]);
        }
        return `{${key}}`;
      })
      .slice(1);

    const unusedParams = Object.keys(params).reduce((acc, key) => {
      if (!usedParams.has(key)) {
        acc[key] = params[key];
      }
      return acc;
    }, {} as Record<string, any>);

    const query = serializeQueryParams(unusedParams, arrayFormat || "brackets");

    return query ? `${replacedUrl}?${query}` : replacedUrl;
  }

  async function client<
    Url extends keyof Swagger,
    Method extends keyof Swagger[Url]
  >({
    url,
    payload,
    signal,
    method,
    isMock,
    server,
    headers = {},
    arrayFormat,
    cacheOptions,
  }: {
    url: Url;
    server?: boolean;
    method: Method;
    signal?: AbortSignal;
    isMock?: boolean;
    headers?: Record<string, string>;
    arrayFormat?: "repeat" | "brackets";
    payload?: DeepPartial<Omit<Swagger[Url][Method], "result">>;
    cacheOptions?: HttpCacheOptions;
  }) {

    const bodyOutSide = customBody?.() || {};
    const params = (payload as any)?.params || {};

    let finalUrl: string;
    finalUrl = replaceUrlParams(
      url as string,
      { ...bodyOutSide, ...params },
      arrayFormat
    );

    const headersOutSide = customHeaders?.() || {};

    const response = await api(
      {
        signal,
        url: finalUrl,
        arrayFormat,
        server,
        method: method as any,
        body: { ...bodyOutSide, ...(payload as any)?.requestBody },
        headers: { ...headersOutSide, ...headers },
        cacheOptions,
      },
      typeof basePath === "string" ? basePath : undefined
    );

    return response as Swagger[Url][Method] extends { result: infer R }
      ? R
      : never;
  }

  if (typeof basePath === "string" || !basePath) {
    return { client } as CreateClientReturn<Swagger, TBase>;
  }

  const out = Object.keys(basePath).reduce((acc, key) => {
    (acc as any)[key] = { client };
    return acc;
  }, {} as Record<string, Client<Swagger>>);

  return out as CreateClientReturn<Swagger, TBase>;
}

function serializeQueryParams(
  params: Record<string, any>,
  arrayFormat: "repeat" | "brackets" = "brackets"
): string {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (arrayFormat === "brackets") {
          searchParams.append(`${key}[]`, String(item));
        } else {
          searchParams.append(key, String(item));
        }
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
}
