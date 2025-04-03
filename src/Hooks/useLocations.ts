import { useState, useEffect, useContext } from "react";
import { apiUrl } from "@Utils/config";
import AlertContext from "@StateManagement/Alert/AlertContext";
import { Dog, Location } from "@Utils/types";

const useLocations = (dogs: Dog[]) => {
  const [zipCodeMap, setZipCodeMap] = useState<Record<string, Location>>({});

  const { dispatch } = useContext(AlertContext);

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

        if (response.status !== 200) {
          throw new Error("There was an error retrieving location information");
        }

        const locations = await response.json();
        const map: Record<string, Location> = {};

        locations.forEach((location: Location) => {
          if (location) {
            const { zip_code } = location;
            map[zip_code] = location;
          }
        });

        setZipCodeMap(map);
      } catch (err) {
        const error = err as Error;
        dispatch({
          type: "UPDATE_ERROR",
          payload: error.message,
        });
      }
    };

    fetchLocations();
  }, [dogs, dispatch]);

  return { zipCodeMap };
};

export default useLocations;
