import { styled } from "@/styles";

export const section = styled(({ space }) => ({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
}));

export const sectionTitle = styled(({ font, space }) => ({
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    fontFamily: font.family.base,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    paddingLeft: space[3],
    marginBottom: space[1],
}));

export const dropMenuRoot = styled(({ space }) => ({
    gap: space[1],
}));

export const dropMenuItemContent = styled(({ space, font, radius, transition }) => ({
    gap: space[3],
    padding: `${space[2]} ${space[3]}`,
    borderRadius: radius.md,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    fontFamily: font.family.base,
    color: "#374151",
    transition: `all ${transition.fast}`,
    selectors: {
        "&:hover": {
            background: "rgba(0, 0, 0, 0.04)",
        },
    },
}));

export const dropMenuItemContentActive = styled(({ font, radius }) => ({
    background: "rgba(34, 197, 94, 0.1)",
    color: "#15803d",
    fontWeight: font.weight.semibold,
    borderRadius: radius.md,
    boxShadow: "inset 3px 0 0 #22c55e",
}));

export const dropMenuIcon = styled(() => ({
    width: "20px",
    height: "20px",
}));

export const dropMenuChildren = styled(({ space }) => ({
    gap: space[1],
    marginTop: space[1],
}));

export const dropMenuChevron = styled(({ transition }) => ({
    transition: `transform ${transition.fast}`,
}));
