import { styled } from "@/styles";

export const header = styled(({ space }) => ({
  display: "flex",
  gap: space[6],
  width: "240px",
  padding: space[4],
}));