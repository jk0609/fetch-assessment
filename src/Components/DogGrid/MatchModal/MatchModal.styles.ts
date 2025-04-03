import styled from "@emotion/styled";
import { Button, Card, CardMedia } from "@mui/material";
import Modal from "@mui/material/Modal";

export const Container = styled(Modal)``;

export const Content = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  min-height: 400px;
  min-width: 300px;
  background-color: #f4f0ee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 15px;
`;

export const Image = styled(CardMedia)`
  height: 200px;
  width: 60%;
  border-radius: 10px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.span`
  font-size: 24px;
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Meet = styled(Button)`
  height: 40px;
  background-color: #79c4b7;
  color: #fff;

  &:hover {
    background-color: #429587;
  }
`;
export const GoBack = styled(Button)`
  height: 40px;
  color: #000;
  background-color: #d3d3d3;

  &:hover {
    background-color: transparent;
  }
`;

export const Spinner = styled.div`
  border: 12px solid #fff;
  border-top: 12px solid #d3d3d3;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
