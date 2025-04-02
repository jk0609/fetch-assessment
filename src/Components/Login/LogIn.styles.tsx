import styled from "@emotion/styled";
export { default as FormControl } from "@mui/material/FormControl";
import { Button, FormLabel, TextField } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  gap: 1rem;
  border-radius: 10px;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 24px;
`;

export const Label = styled(FormLabel)``;

export const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

export const Field = styled(TextField)``;

export const LogInButton = styled(Button)`
  height: 40px;
  width: 100%;
  background-color: #79c4b7;
  border-radius: 10px;
  color: #fff;

  &:hover {
    background-color: #429587;
  }
`;
