import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingCurrentCity, setIsLoadingCurrentCity] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoadingCities(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoadingCities(false);
      }
    }
    fetchCities();
    //   hello
  }, []);

  async function getCity(id) {
    try {
      setIsLoadingCurrentCity(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoadingCurrentCity(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoadingCurrentCity(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoadingCurrentCity(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoadingCities,
        isLoadingCurrentCity,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
