import { useEffect, useState, useContext } from "react";
import { apiUrl } from "../../../config";
import { Container, BreedSelect, BreedOption } from "./Filters.styles";
import FiltersContext from "../../../StateManagement/FiltersContext";

const Filters = () => {
  const [breedOptions, setBreedOptions] = useState([]);

  const { state, dispatch } = useContext(FiltersContext);

  const { breeds } = state;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${apiUrl}/dogs/breeds`, {
          credentials: "include",
        });
        const breeds = await response.json();
        setBreedOptions(breeds);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBreeds();
  }, []);

  return (
    <Container>
      {breedOptions && (
        <BreedSelect
          value={breeds ?? []}
          label="Breeds"
          onChange={(e) => {
            dispatch({
              type: "UPDATE_BREEDS",
              payload: e.target.value as unknown as string[],
            });
          }}
          select
          variant="outlined"
          slotProps={{
            inputLabel: {
              style: {
                color: "white",
              },
            },
            select: {
              multiple: true,
            },
          }}
        >
          {breedOptions.map((breed) => (
            <BreedOption key={breed} value={breed}>
              {breed}
            </BreedOption>
          ))}
        </BreedSelect>
      )}
    </Container>
  );
};

export default Filters;
