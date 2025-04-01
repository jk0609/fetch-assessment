import styled from "@emotion/styled";
import { Card, CardMedia, CardContent } from "@mui/material";

export const Container = styled(Card)``;

export const Image = styled(CardMedia)`
  height: 200px;
  width: 100%;
  border-radius: 5px;
`;

export const Content = styled(CardContent)``;

export const Name = styled.div`
  font-weight: 600;
  font-size: 24px;
  text-align: left;
`;

export const Info = styled.div`
  text-align: left;
`;

export const Label = styled.span`
  font-weight: 600;
`;
