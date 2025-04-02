import { Container, Content, Image, Text } from "./MatchModal.styles";
import { Dog } from "../../../types";

type Props = {
  isModalOpen: boolean;
  match: Dog | undefined;
  onClose: () => void;
};

const MatchModal = (props: Props) => {
  const { isModalOpen, match, onClose } = props;

  return (
    <Container open={isModalOpen} onClose={onClose}>
      {match ? (
        <Content>
          <Image image={match.img} title={`${match.name}-${match.id}`} />
          <Text>Congratulations! You've matched with {match.name}.</Text>
        </Content>
      ) : (
        <div>spinner</div>
      )}
    </Container>
  );
};

export default MatchModal;
