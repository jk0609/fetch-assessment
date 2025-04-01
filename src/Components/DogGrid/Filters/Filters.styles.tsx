import styled from "@emotion/styled";
import { MenuItem, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  const { slotProps, children, ...propsRest } = props;
  return (
    <TextField
      select
      variant="outlined"
      slotProps={{
        inputLabel: {
          style: {
            color: "white",
          },
        },
        ...slotProps,
      }}
      {...propsRest}
    >
      {children}
    </TextField>
  );
})`
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
  width: 25%;
`;

export const Option = styled(MenuItem)``;

export const Breed = styled(Select)``;
export const SortBy = styled(Select)``;
export const SortDirection = styled(Select)``;
