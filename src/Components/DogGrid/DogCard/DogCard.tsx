import { Dog, Location } from "@Utils/types";
import {
  Container,
  Content,
  Image,
  Info,
  Label,
  LoadingSpinner,
  Name,
  SelectButton,
  UnselectButton,
} from "./DogCard.styles";

type Props = {
  dog: Dog;
  location: Location;
  onSelect: (dog: Dog) => void;
  onUnselect: (dog: Dog) => void;
  isSelected: boolean;
};

const DogCard = (props: Props) => {
  const { dog, location, onSelect, onUnselect, isSelected } = props;
  const { age, breed, id, img, name } = dog;

  return (
    <Container variant="outlined" $isSelected={isSelected}>
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
        {location ? (
          <Info>
            <Label>Location: </Label>
            {`${location.city}, ${location.state ?? location.county}`}
          </Info>
        ) : (
          <LoadingSpinner />
        )}
      </Content>
      {isSelected ? (
        <UnselectButton onClick={() => onUnselect(dog)} />
      ) : (
        <SelectButton onClick={() => onSelect(dog)}>Select Me!</SelectButton>
      )}
    </Container>
  );
};

export default DogCard;
