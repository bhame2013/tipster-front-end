import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
    font: {
        family: {
            base: "var(--font-sofia)",
            mono: "'Geist Mono', monospace",
        },
        size: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
        },
        weight: {
            regular: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
        },
    },
    space: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
    },
    radius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
    },
    transition: {
        fast: "150ms ease",
        normal: "250ms ease",
        slow: "350ms ease",
    },
    color: {
        background: "#ededed",
        foreground: "#0a0a0a",
        primary: "rgba(46, 109, 180, 1)",
        primaryAlpha: "rgba(46, 109, 180, 0.18)",
        primaryBorder: "rgba(46, 109, 180, 0.2)",
        textPrimary: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.78)",
        hoverBg: "rgba(255, 255, 255, 0.08)",
    },
});
