"use client";

import { createContext, useContext, useState } from "react";

import * as baseStyles from "./styles.css";

export interface DropMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: DropMenuItem[];
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  defaultExpanded?: boolean;
}

export interface DropMenuClassNames {
  root?: string;
  item?: string;
  itemContent?: string;
  itemContentActive?: string;
  itemContentCollapsed?: string;
  icon?: string;
  label?: string;
  chevron?: string;
  chevronExpanded?: string;
  children?: string;
}

interface DropMenuProps {
  items: DropMenuItem[];
  collapsed?: boolean;
  className?: string;
  classNames?: DropMenuClassNames;
}

const DropMenuContext = createContext<{
  classNames: DropMenuClassNames;
  collapsed: boolean;
}>({
  classNames: {},
  collapsed: false,
});

export function DropMenu({ items, collapsed = false, className, classNames = {} }: DropMenuProps) {
  return (
    <DropMenuContext.Provider value={{ classNames, collapsed }}>
      <nav className={`${baseStyles.dropMenu} ${classNames.root || ""} ${className || ""}`}>
        {items.map((item) => (
          <DropMenuItemComponent key={item.id} item={item} level={0} />
        ))}
      </nav>
    </DropMenuContext.Provider>
  );
}

interface DropMenuItemProps {
  item: DropMenuItem;
  level: number;
}

function DropMenuItemComponent({ item, level }: DropMenuItemProps) {
  const { classNames, collapsed } = useContext(DropMenuContext);
  const [isExpanded, setIsExpanded] = useState(item.defaultExpanded || false);
  const hasChildren = !!(item.children && item.children.length > 0);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (item.href) {
      window.location.href = item.href;
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  const contentClasses = [
    baseStyles.dropMenuItemContent,
    classNames.itemContent,
    item.isActive && classNames.itemContentActive,
    collapsed && classNames.itemContentCollapsed,
  ]
    .filter(Boolean)
    .join(" ");

  const chevronClasses = [
    baseStyles.dropMenuChevron,
    classNames.chevron,
    isExpanded && baseStyles.dropMenuChevronExpanded,
    isExpanded && classNames.chevronExpanded,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${baseStyles.dropMenuItem} ${classNames.item || ""}`}>
      <button
        type="button"
        className={contentClasses}
        onClick={handleClick}
        title={item.label}
        style={{ paddingLeft: collapsed ? undefined : `${0.875 + level * 1}rem` }}
      >
        {item.icon && (
          <span className={`${baseStyles.dropMenuIcon} ${classNames.icon || ""}`}>
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className={`${baseStyles.dropMenuLabel} ${classNames.label || ""}`}>
              {item.label}
            </span>
            {hasChildren && (
              <span className={chevronClasses}>
                <ChevronIcon />
              </span>
            )}
          </>
        )}
      </button>

      {hasChildren && isExpanded && !collapsed && (
        <div className={`${baseStyles.dropMenuChildren} ${classNames.children || ""}`}>
          {item.children!.map((child) => (
            <DropMenuItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
