import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";

type ContainerProps = {
  $isSelected: boolean;
};

const CARD_HEIGHT = 450;
const IMAGE_HEIGHT = 200;
const BUTTON_HEIGHT = 40;

export const Container = styled(Card, {
  shouldForwardProp: (prop) => prop !== "$isSelected",
})<ContainerProps>`
  border: 3px solid ${(props) => (props.$isSelected ? "#79c4b7" : "#f4f0ee")};
  border-radius: 15px;
  height: ${CARD_HEIGHT}px;
`;

export const Image = styled(CardMedia)`
  height: ${IMAGE_HEIGHT}px;
  width: 100%;
`;

export const Content = styled(CardContent)`
  height: ${CARD_HEIGHT - IMAGE_HEIGHT - BUTTON_HEIGHT}px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 0;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  text-align: left;
  color: #ef3825;
`;

export const Info = styled.div`
  text-align: left;
`;

export const Label = styled.span`
  font-weight: 600;
`;

type UnselectButtonProps = {
  onClick: () => void;
};

export const SelectButton = styled(Button)`
  height: 40px;
  width: 100%;
  background-color: #79c4b7;
  border-radius: 0;
  color: #fff;

  &:hover {
    background-color: #429587;
  }
`;

export const UnselectButton = styled((props: UnselectButtonProps) => (
  <IconButton {...props}>
    <Close />
  </IconButton>
))`
  height: 40px;
  width: 100%;
  border-radius: 0;
  background-color: #79c4b7;
  color: #fff;
  padding: 6px 8px;

  &:hover {
    background-color: #429587;
  }
`;
