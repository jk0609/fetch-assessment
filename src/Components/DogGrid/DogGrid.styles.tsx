import styled from "@emotion/styled";
import { Button } from "@mui/material";

export { default as Grid } from "@mui/material/Grid";
export { default as MatchModal } from "./MatchModal/MatchModal";
export { default as DogCard } from "./DogCard/DogCard";
export { default as Filters } from "./Filters/Filters";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95vw;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 30px;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Match = styled(Button)`
  height: 40px;
  background-color: #79c4b7;
  color: #fff;

  &:hover {
    background-color: #429587;
  }
`;

export const LogOut = styled(Button)`
  height: 40px;
  color: #000;

  &:hover {
    background-color: transparent;
  }
`;

const Spinner = styled.div`
  border: 12px solid #fff;
  border-top: 12px solid #000;
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

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 95vw;
`;

export const LoadingSpinner = styled(() => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
))``;

export const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 95vw;
`;
