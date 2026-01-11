import { SportsFilter } from "./components/Filters/components/Sports";
import { ProfilesFilter } from "./components/Filters/components/Profiles";

import { useSports } from "@/hook";

import * as styles from "./styles.css";
import { Filters } from "./components/Filters";

export async function Sidebar() {
  const sportsData = await useSports({
    cache: "force-cache",
    next: { tags: ["sports"] },
  });
  // invalidar o cache -> revalidateTag("sports");

  return (
    <aside className={styles.sidebar}>
      <Filters sportsData={sportsData} />
    </aside>
  );
}
