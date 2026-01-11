import { useSports } from "@/hook";

import * as s from "./styles.css";

export async function Header() {
  const sports = await useSports({
    cache: "force-cache",
    next: { tags: ["sports"] },
  });

  return <div className={s.header}>{JSON.stringify(sports)}</div>;
}
