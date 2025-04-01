import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export const Container = styled.div``;

export const NextButton = styled((props: ButtonProps) => (
  <IconButton {...props}>
    <ArrowForward style={{ color: "white" }} />
  </IconButton>
))``;

export const PrevButton = styled((props: ButtonProps) => (
  <IconButton {...props}>
    <ArrowBack style={{ color: "white" }} />
  </IconButton>
))``;

export const PageNumber = styled.span``;
