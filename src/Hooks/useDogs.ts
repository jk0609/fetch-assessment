import { useState, useEffect, useContext } from "react";
import { apiUrl } from "@Utils/config";
import AlertContext from "@StateManagement/Alert/AlertContext";
import FiltersContext from "@StateManagement/Filters/FiltersContext";
import { Dog } from "@Utils/types";

const PAGE_SIZE = 25;

const useDogs = (page: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { state: filtersState } = useContext(FiltersContext);
  const { breeds, sortBy, sortDir, age } = filtersState;
  const { dispatch } = useContext(AlertContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchDogs = async () => {
      try {
        // @ts-expect-error: Passing an array into URLSearchParams
        const params = new URLSearchParams({
          ...(breeds.length !== 0 && { breeds }),
          size: PAGE_SIZE.toString(),
          from: ((page - 1) * PAGE_SIZE).toString(),
          sort: `${sortBy}:${sortDir}`,
          ageMin: age[0].toString(),
          ageMax: age[1].toString(),
        });

        const idResponse = await fetch(
          `${apiUrl}/dogs/search?${params.toString()}`,
          {
            credentials: "include",
          }
        );

        if (idResponse.status !== 200) {
          throw new Error("There was an error retrieving dog information");
        }

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

        if (dogResponse.status !== 200) {
          throw new Error("There was an error retrieving dog information");
        }

        const dogResults = await dogResponse.json();
        setDogs(dogResults);
      } catch (err) {
        const error = err as Error;
        dispatch({
          type: "UPDATE_ERROR",
          payload: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [breeds, page, sortBy, sortDir, age, dispatch]);

  return { dogs, isLoading, hasNextPage };
};

export default useDogs;
