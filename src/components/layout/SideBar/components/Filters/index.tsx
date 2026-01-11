import { ProfilesFilter } from "./components/Profiles";
import { SportsFilter } from "./components/Sports";

export function Filters({ sportsData }: { sportsData: any }) {
  return (
    <>
      <ProfilesFilter />
      <SportsFilter sportsData={sportsData} />
    </>
  );
}
