import { globalStyle, style } from "@vanilla-extract/css";

export const dropMenu = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const dropMenuItem = style({
  width: "100%",
});

export const dropMenuItemContent = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const dropMenuIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

globalStyle(`${dropMenuIcon} svg`, {
  width: "100%",
  height: "100%",
});

export const dropMenuLabel = style({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const dropMenuChevron = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
});

export const dropMenuChevronExpanded = style({
  transform: "rotate(180deg)",
});

export const dropMenuChildren = style({
  display: "flex",
  flexDirection: "column",
});
