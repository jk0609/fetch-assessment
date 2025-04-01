import { Dog } from "../../../types";
import { Container, Content, Image, Info, Label, Name } from "./DogCard.styles";

type Props = {
  dog: Dog;
};

const DogCard = (props: Props) => {
  const { dog } = props;
  const { age, breed, id, img, name, zip_code: zipCode } = dog;

  // @JonK: age to years
  // @JonK: zipcode to location

  return (
    <Container variant="outlined">
      <Image image={img} title={`${name}-${id}`} />
      <Content>
        <Name>{name}</Name>
        <Info>
          <Label>Age: </Label>
          {age}
        </Info>
        <Info>
          <Label>Breed: </Label>
          {breed}
        </Info>
        <Info>
          <Label>Location: </Label>
          {zipCode}
        </Info>
      </Content>
    </Container>
  );
};

export default DogCard;
