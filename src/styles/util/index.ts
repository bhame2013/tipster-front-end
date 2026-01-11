import { StyleRule, style as vanillaStyle } from "@vanilla-extract/css";

import { vars } from "../theme.css";

type Exact<T, Shape> = T & {
    [K in Exclude<keyof T, keyof Shape>]: never;
};

export function styled<T extends StyleRule>(
    callBack: (theme: typeof vars) => Exact<T, StyleRule>
): string {
    return vanillaStyle(callBack(vars));
}