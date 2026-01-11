import { Bookmark, Filter, Users } from "lucide-react";

import { DropMenu, DropMenuClassNames, DropMenuItem } from "@/components/ui";

import * as styles from "../styles.css";

export function ProfilesFilter() {
  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>Profiles</span>
      <DropMenu items={profilesItems} classNames={dropMenuClassNames} />
    </div>
  );
}

const profilesItems: DropMenuItem[] = [
  {
    id: "all-profiles",
    label: "All Profiles",
    icon: <Filter size={18} />,
    isActive: true,
  },
  { id: "subscriptions", label: "Subscriptions", icon: <Bookmark size={18} /> },
  { id: "following", label: "Following", icon: <Users size={18} /> },
];

const dropMenuClassNames: DropMenuClassNames = {
  root: styles.dropMenuRoot,
  itemContent: styles.dropMenuItemContent,
  itemContentActive: styles.dropMenuItemContentActive,
  icon: styles.dropMenuIcon,
  children: styles.dropMenuChildren,
  chevron: styles.dropMenuChevron,
};
