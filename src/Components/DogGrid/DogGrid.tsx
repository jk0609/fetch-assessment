import { useContext, useEffect, useState } from "react";
import { apiUrl } from "@Utils/config";
// @JonK: move these imports to styles
import DogCard from "./DogCard/DogCard";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import { Dog, Location } from "@Utils/types";
import {
  Container,
  Controls,
  Buttons,
  Grid,
  GridContainer,
  Match,
  MatchModal,
  LoadingSpinner,
  LogOut,
  NoResults,
} from "./DogGrid.styles";
import FiltersContext from "@StateManagement/FiltersContext";

const PAGE_SIZE = 25;

type Props = {
  onLogOut: () => void;
};

const DogGrid = (props: Props) => {
  const { onLogOut } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [zipCodeMap, setZipCodeMap] = useState<Record<string, Location>>({});
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [match, setMatch] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state: filtersState } = useContext(FiltersContext);
  const { breeds, sortBy, sortDir } = filtersState;

  // @JonK: pull dogs and location into custom hooks
  useEffect(() => {
    setIsLoading(true);
    const fetchDogs = async () => {
      try {
        const params = new URLSearchParams({
          ...(breeds.length !== 0 && { breeds }),
          size: PAGE_SIZE,
          from: (page - 1) * PAGE_SIZE,
          sort: `${sortBy}:${sortDir}`,
        });

        const idResponse = await fetch(
          `${apiUrl}/dogs/search?${params.toString()}`,
          {
            credentials: "include",
          }
        );
        const { resultIds, total } = await idResponse.json();

        const resultsCount = (page - 1) * PAGE_SIZE + resultIds.length;
        setHasNextPage(resultsCount < total);

        const dogResponse = await fetch(`${apiUrl}/dogs`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(resultIds),
          credentials: "include",
        });

        const dogResults = await dogResponse.json();
        setDogs(dogResults);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [breeds, page, sortBy, sortDir]);

  useEffect(() => {
    setPage(1);
  }, [breeds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const zipCodes = dogs.map((dog) => dog.zip_code);

    const fetchLocations = async () => {
      try {
        const response = await fetch(`${apiUrl}/locations`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(zipCodes),
          credentials: "include",
        });

        const locations = await response.json();
        const map: Record<string, Location> = {};

        // @JonK: Double check for possible zip code collision if coordinates are different
        locations.forEach((location: Location) => {
          if (location) {
            const { zip_code } = location;
            map[zip_code] = location;
          }
        });

        setZipCodeMap(map);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, [dogs]);

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

      const { match } = await response.json();
      const matchedDog = selectedDogs.find((dog) => dog.id === match);
      setMatch(matchedDog);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      onLogOut();
      console.log(response);
    } catch (err) {
      console.error(err);
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
