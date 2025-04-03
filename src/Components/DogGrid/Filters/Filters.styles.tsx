import styled from "@emotion/styled";
import { MenuItem, Slider, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

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

type SliderProps = {
  value: number[];
  valueLabelDisplay: "on" | "auto" | "off" | undefined;
  min: number;
  max: number;
  onChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  disableSwap: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  background: #fff;
  gap: 1rem;
  border-radius: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Select = styled((props: SelectProps) => {
  const { children, ...propsRest } = props;
  return (
    <TextField select variant="outlined" {...propsRest}>
      {children}
    </TextField>
  );
})`
  width: 120px;
`;

export const Option = styled(MenuItem)``;

export const Breed = styled(Select)`
  width: 200px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SortBy = styled(Select)``;
export const SortDirection = styled(Select)``;

const AgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`;
const AgeLabel = styled.span``;
const AgeSlider = styled(Slider)``;

export const Age = styled((props: SliderProps) => {
  return (
    <AgeContainer>
      <AgeLabel>Age</AgeLabel>
      <AgeSlider {...props} />
    </AgeContainer>
  );
})``;
