import styled from "@emotion/styled";
import { Card, CardMedia } from "@mui/material";
import Modal from "@mui/material/Modal";

export const Container = styled(Modal)``;

export const Content = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: #242424;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const Image = styled(CardMedia)`
  height: 200px;
  width: 50%;
`;

export const Text = styled.span`
  font-size: 24px;
`;
