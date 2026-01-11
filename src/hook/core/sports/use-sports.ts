import { httpClient } from "@/utils/http/swagger-http-client";
import { HttpCacheOptions } from "@/utils/http/interfaces";

async function fetchSports(cacheOptions?: HttpCacheOptions) {
    const sportsData = (await httpClient.tipsterBackend({
        url: "/sports/sports",
        method: "get",
        cacheOptions,
    })) as any;

    return { sportsData };
}

export const useSports = fetchSports;