import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../config";
import DogCard from "./DogCard/DogCard";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import { Dog, Location } from "../../types";
import { Grid } from "./DogGrid.styles";
import FiltersContext from "../../StateManagement/FiltersContext";

const PAGE_SIZE = 25;

const DogGrid = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [zipCodeMap, setZipCodeMap] = useState<Record<string, Location>>({});
  const { state: filtersState } = useContext(FiltersContext);

  const { breeds, sortBy, sortDir } = filtersState;

  useEffect(() => {
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
      }
    };

    fetchDogs();
  }, [breeds, page, sortBy, sortDir]);

  useEffect(() => {
    setPage(1);
  }, [breeds]);

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
          const { zip_code } = location;
          map[zip_code] = location;
        });

        setZipCodeMap(map);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, [dogs]);

  return (
    <div>
      <Filters />
      <Grid container spacing={2} columns={10}>
        {dogs.map((dog) => (
          <Grid key={dog.id} size={2}>
            <DogCard dog={dog} location={zipCodeMap[dog.zip_code]} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        changePage={(newPage: number) => setPage(newPage)}
        page={page}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default DogGrid;
