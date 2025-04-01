import { Dog, Location } from "../../../types";
import { Container, Content, Image, Info, Label, Name } from "./DogCard.styles";

type Props = {
  dog: Dog;
  location: Location;
};

const DogCard = (props: Props) => {
  const { dog, location } = props;
  const { age, breed, id, img, name } = dog;

  return (
    <Container variant="outlined">
      <Image image={img} title={`${name}-${id}`} />
      <Content>
        <Name>{name}</Name>
        <Info>
          <Label>Age: </Label>
          {age === 0 ? "Less than 1 " : `${age} `}
          year{age > 1 ? "s" : ""} old
        </Info>
        <Info>
          <Label>Breed: </Label>
          {breed}
        </Info>
        {/* @JonK: loading spinner if location is unavailable */}
        {location ? (
          <Info>
            <Label>Location: </Label>
            {`${location.city}, ${location.state ?? location.county}`}
          </Info>
        ) : (
          <div>Spinner</div>
        )}
      </Content>
    </Container>
  );
};

export default DogCard;
