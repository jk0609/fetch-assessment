import styled from "@emotion/styled";
import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  background: #fff;
  gap: 1rem;
  border-radius: 5px;
`;

type SelectProps = {
  children: ReactNode;
  value: string | string[];
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  slotProps?: {
    select: {
      multiple: boolean;
    };
  };
};
const Select = styled((props: SelectProps) => {
  const { children, ...propsRest } = props;
  return (
    <TextField select variant="outlined" {...propsRest}>
      {children}
    </TextField>
  );
})`
  width: 15%;
`;

export const Option = styled(MenuItem)``;

export const Breed = styled(Select)`
  width: 40%;
`;

export const SortBy = styled(Select)``;
export const SortDirection = styled(Select)``;
