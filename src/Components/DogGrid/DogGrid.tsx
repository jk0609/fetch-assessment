import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../../config";
import DogCard from "./DogCard/DogCard";
import Filters from "./Filters/Filters";
import Pagination from "./Pagination/Pagination";
import { Dog } from "../../types";
import { Grid } from "./DogGrid.styles";
import FiltersContext from "../../StateManagement/FiltersContext";

const PAGE_SIZE = 25;

const DogGrid = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { state: filtersState } = useContext(FiltersContext);

  const { breeds } = filtersState;

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const params = new URLSearchParams({
          ...(!!breeds && breeds.length !== 0 && { breeds }),
          size: PAGE_SIZE,
          from: (page - 1) * PAGE_SIZE,
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
  }, [breeds, page]);

  useEffect(() => {
    setPage(1);
  }, [breeds]);

  return (
    <div>
      <Filters />
      <Grid container spacing={2} columns={10}>
        {dogs.map((dog) => (
          <Grid key={dog.id} size={2}>
            <DogCard dog={dog} />
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
