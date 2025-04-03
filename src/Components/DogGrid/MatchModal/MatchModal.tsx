import {
  Container,
  Content,
  Image,
  Text,
  TextContainer,
  Buttons,
  Meet,
  GoBack,
  Spinner,
} from "./MatchModal.styles";
import { Dog } from "@Utils/types";

type Props = {
  isModalOpen: boolean;
  match: Dog | undefined;
  onClose: () => void;
};

const MatchModal = (props: Props) => {
  const { isModalOpen, match, onClose } = props;

  return (
    <Container open={isModalOpen} onClose={onClose}>
      <Content>
        {match ? (
          <>
            <Image image={match.img} title={`${match.name}-${match.id}`} />
            <TextContainer>
              <Text>Congratulations!</Text>
              <Text>You've matched with {match.name}</Text>
            </TextContainer>
            <Buttons>
              <GoBack onClick={onClose}>Go Back</GoBack>
              <Meet>Meet {match.name}</Meet>
            </Buttons>
          </>
        ) : (
          <Spinner />
        )}
      </Content>
    </Container>
  );
};

export default MatchModal;
