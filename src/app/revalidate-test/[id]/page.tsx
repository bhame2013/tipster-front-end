import { useFixtureById } from "@/hook/core/sports/fixtures/use-fixture-by-id";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sportName?: string }>;
};

async function FixtureContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log(id, "ue")

  const { fixtureByIdData } = await useFixtureById({ fixtureId: id, sportName: "football" });

  return <>{JSON.stringify(fixtureByIdData)}</>;
}

export default async function PageRevalidateTest({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...eee</div>}>
      <FixtureContent params={params} />
    </Suspense>
  );
}
