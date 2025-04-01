import styled from "@emotion/styled";
import { MenuItem, TextField } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BreedSelect = styled(TextField)`
  .MuiOutlinedInput-root {
    color: white;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  :hover .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  .MuiSvgIcon-root {
    fill: white;
  }
`;

export const BreedOption = styled(MenuItem)``;
