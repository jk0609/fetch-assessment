import styled from "@emotion/styled";
import { Button } from "@mui/material";

export { default as Grid } from "@mui/material/Grid";
export { default as MatchModal } from "./MatchModal/MatchModal";

export const Container = styled.div``;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin-bottom: 30px;
  background-color: #fff;
`;

export const Match = styled(Button)`
  height: 40px;
  background-color: #79c4b7;
  color: #fff;

  &:hover {
    background-color: #429587;
  }
`;
