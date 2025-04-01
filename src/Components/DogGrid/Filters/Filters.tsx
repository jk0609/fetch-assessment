import { useEffect, useState, useContext } from "react";
import { apiUrl } from "../../../config";
import {
  Container,
  Breed,
  SortBy,
  SortDirection,
  Option,
} from "./Filters.styles";
import FiltersContext from "../../../StateManagement/FiltersContext";

const Filters = () => {
  const [breedOptions, setBreedOptions] = useState([]);

  const { state, dispatch } = useContext(FiltersContext);

  const { breeds, sortBy, sortDir } = state;

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
        <Breed
          value={breeds ?? []}
          label="Breeds"
          onChange={(e) => {
            dispatch({
              type: "UPDATE_BREEDS",
              payload: e.target.value as unknown as string[],
            });
          }}
          slotProps={{
            select: {
              multiple: true,
            },
          }}
        >
          {breedOptions.map((breed) => (
            <Option key={breed} value={breed}>
              {breed}
            </Option>
          ))}
        </Breed>
      )}
      <SortBy
        value={sortBy}
        label="Sort By"
        onChange={(e) => {
          dispatch({
            type: "UPDATE_SORT_BY",
            payload: e.target.value,
          });
        }}
      >
        <Option key="breed" value="breed">
          Breed
        </Option>
        <Option key="name" value="name">
          Name
        </Option>
        <Option key="age" value="age">
          Age
        </Option>
      </SortBy>
      <SortDirection
        value={sortDir}
        label="Sort Direction"
        onChange={(e) => {
          dispatch({
            type: "UPDATE_SORT_DIR",
            payload: e.target.value,
          });
        }}
      >
        <Option key="desc" value="desc">
          Descending
        </Option>
        <Option key="asc" value="asc">
          Ascending
        </Option>
      </SortDirection>
    </Container>
  );
};

export default Filters;
