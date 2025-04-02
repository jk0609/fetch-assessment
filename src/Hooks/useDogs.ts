import { useState, useEffect, useContext } from "react";
import { apiUrl } from "@Utils/config";
import AlertContext from "@StateManagement/Alert/AlertContext";

const PAGE_SIZE = 25;

const useDogs = (
  breeds: string[],
  page: number,
  sortBy: string,
  sortDir: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { dispatch } = useContext(AlertContext);

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
        dispatch({
          type: "UPDATE_ERROR",
          payload: err.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, [breeds, page, sortBy, sortDir, dispatch]);

  return { dogs, isLoading, hasNextPage };
};

export default useDogs;
