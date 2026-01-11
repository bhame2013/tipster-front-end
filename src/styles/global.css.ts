import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./theme.css";

// IMPORTANTE - nao ta funcionando
globalStyle("html, body", {
    maxWidth: "100vw",
    overflowX: "hidden",
    padding: 0,
    margin: 0,
});

globalStyle("body", {
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
    fontFamily: vars.font.family.base,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
});

globalStyle("*", {
    boxSizing: "border-box",
});

globalStyle("a", {
    color: "inherit",
    textDecoration: "none",
});
