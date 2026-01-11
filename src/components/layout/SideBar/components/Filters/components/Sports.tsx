import {  Dribbble, HandFist, Volleyball } from "lucide-react";

import { DropMenu, DropMenuClassNames, DropMenuItem } from "@/components/ui";

import * as styles from "../styles.css";

export function SportsFilter({ sportsData }: { sportsData: any }) {
  const sportsItems: DropMenuItem[] = (sportsData?.sportsData || []).map((item: any) => {
    return { id: item.id, label: item.title, icon: FiltersIcons[item.name] };
  });

  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>Sports</span>
      <DropMenu items={sportsItems} classNames={dropMenuClassNames} />
    </div>
  );
}

const FiltersIcons = {
  football: <Dribbble />,
  basketball: <Volleyball />,
  mma: <HandFist />,
} as any;

const dropMenuClassNames: DropMenuClassNames = {
  root: styles.dropMenuRoot,
  itemContent: styles.dropMenuItemContent,
  itemContentActive: styles.dropMenuItemContentActive,
  icon: styles.dropMenuIcon,
  children: styles.dropMenuChildren,
  chevron: styles.dropMenuChevron,
};
