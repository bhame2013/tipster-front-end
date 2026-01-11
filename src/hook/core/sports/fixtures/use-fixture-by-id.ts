import { httpClient, TipsterBackendTypes } from "@/utils";

export async function useFixtureById(props: TipsterBackendTypes.Swagger['/fixture/fixtureId']['get']['params']) {
    const fixtureByIdData = await httpClient.tipsterBackend({
        url: "/fixture/fixtureId",
        method: 'get',
        payload: {
            params: props
        },
        cacheOptions: {
            cache: "default",
            next: { revalidate: 120, tags: ['fixtures', props.fixtureId] }
        }
    });

    return { fixtureByIdData }
}