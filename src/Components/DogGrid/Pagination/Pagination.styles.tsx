import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

// @JonK: different color when disabled

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export const Container = styled.div``;

export const NextButton = styled((props: ButtonProps) => (
  <IconButton {...props}>
    <ArrowForward />
  </IconButton>
))``;

export const PrevButton = styled((props: ButtonProps) => (
  <IconButton {...props}>
    <ArrowBack />
  </IconButton>
))``;

export const PageNumber = styled.span``;
