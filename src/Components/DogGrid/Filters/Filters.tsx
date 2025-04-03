import { useEffect, useState, useContext } from "react";
import { apiUrl } from "@Utils/config";
import {
  Container,
  Breed,
  SortBy,
  SortDirection,
  Option,
  Age,
} from "./Filters.styles";
import FiltersContext from "@StateManagement/Filters/FiltersContext";
import AlertContext from "@StateManagement/Alert/AlertContext";

const Filters = () => {
  const [breedOptions, setBreedOptions] = useState([]);

  const { state, dispatch: filtersDispatch } = useContext(FiltersContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const { breeds, sortBy, sortDir, age } = state;

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${apiUrl}/dogs/breeds`, {
          credentials: "include",
        });

        if (response.status !== 200) {
          throw new Error("There was an error retrieving breeds");
        }

        const breeds = await response.json();
        setBreedOptions(breeds);
      } catch (err) {
        const error = err as Error;
        alertDispatch({
          type: "UPDATE_ERROR",
          payload: error.message,
        });
      }
    };
    fetchBreeds();
  }, [alertDispatch]);

  return (
    <Container>
      {breedOptions && (
        <Breed
          value={breeds ?? []}
          label="Breeds"
          onChange={(e) => {
            filtersDispatch({
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
          filtersDispatch({
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
          filtersDispatch({
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
      <Age
        value={age}
        valueLabelDisplay="on"
        min={0}
        max={20}
        onChange={(e: Event, value: number | number[]) => {
          filtersDispatch({
            type: "UPDATE_AGE",
            payload: value as number[],
          });
        }}
        disableSwap
      />
    </Container>
  );
};

export default Filters;
