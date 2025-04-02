import { useContext, useEffect, useState } from "react";
import { apiUrl } from "@Utils/config";
import Pagination from "./Pagination/Pagination";
import { Dog } from "@Utils/types";
import {
  Container,
  Controls,
  DogCard,
  Filters,
  Buttons,
  Grid,
  GridContainer,
  Match,
  MatchModal,
  LoadingSpinner,
  LogOut,
  NoResults,
} from "./DogGrid.styles";
import FiltersContext from "@StateManagement/Filters/FiltersContext";
import AlertContext from "@StateManagement/Alert/AlertContext";
import useDogs from "@Hooks/useDogs";
import useLocations from "@Hooks/useLocations";

type Props = {
  onLogOut: () => void;
};

const DogGrid = (props: Props) => {
  const { onLogOut } = props;

  const [page, setPage] = useState(1);
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [match, setMatch] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state: filtersState } = useContext(FiltersContext);
  const { breeds, sortBy, sortDir } = filtersState;

  const { dispatch: alertDispatch } = useContext(AlertContext);

  const { dogs, isLoading, hasNextPage } = useDogs(
    breeds,
    page,
    sortBy,
    sortDir
  );
  const { zipCodeMap } = useLocations(dogs);

  useEffect(() => {
    setPage(1);
  }, [breeds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const fetchMatch = async () => {
    const ids = selectedDogs.map((dog) => dog.id);
    try {
      const response = await fetch(`${apiUrl}/dogs/match`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(ids),
        credentials: "include",
      });

      if (response.status !== 200) {
        throw new Error("There was an error getting a match");
      }

      const { match } = await response.json();
      const matchedDog = selectedDogs.find((dog) => dog.id === match);
      setMatch(matchedDog);
    } catch (err) {
      alertDispatch({
        type: "UPDATE_ERROR",
        payload: err.message,
      });
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status !== 200) {
        throw new Error("There was an error logging out");
      }

      onLogOut();
    } catch (err) {
      alertDispatch({
        type: "UPDATE_ERROR",
        payload: err.message,
      });
    }
  };

  return (
    <Container>
      <Controls>
        <Filters />
        <Buttons>
          <Match
            onClick={() => {
              setMatch(undefined);
              setIsModalOpen(true);
              fetchMatch();
            }}
            disabled={!selectedDogs.length}
          >
            Match Me!
          </Match>
          <LogOut onClick={() => logOut()}>Log Out</LogOut>
        </Buttons>
      </Controls>
      <GridContainer>
        {isLoading ? (
          <LoadingSpinner />
        ) : !dogs.length ? (
          <NoResults>No Dogs Found</NoResults>
        ) : (
          <Grid container spacing={2} columns={10}>
            {dogs.map((dog) => (
              <Grid key={dog.id} size={{ xs: 10, md: 2 }}>
                <DogCard
                  dog={dog}
                  location={zipCodeMap[dog.zip_code]}
                  onSelect={(dog: Dog) =>
                    setSelectedDogs([...selectedDogs, dog])
                  }
                  onUnselect={(unselectedDog: Dog) =>
                    setSelectedDogs(
                      selectedDogs.filter((dog) => dog.id !== unselectedDog.id)
                    )
                  }
                  isSelected={selectedDogs.some(
                    (selectedDog) => selectedDog.id === dog.id
                  )}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </GridContainer>
      <Pagination
        changePage={(newPage: number) => setPage(newPage)}
        page={page}
        hasNextPage={hasNextPage}
      />
      <MatchModal
        isModalOpen={isModalOpen}
        match={match}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default DogGrid;
