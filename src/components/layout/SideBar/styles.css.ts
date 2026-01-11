import { styled } from "@/styles";

export const sidebar = styled(({ space }) => ({
  display: "flex",
  flexDirection: "column",
  gap: space[6],
  width: "240px",
  padding: space[4],
}));

