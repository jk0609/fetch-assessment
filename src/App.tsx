import { useState, useReducer } from "react";
import "./App.css";
import { filtersReducer, initialState } from "@StateManagement/FiltersReducer";
import FiltersContext from "@StateManagement/FiltersContext";
import DogGrid from "@Components/DogGrid/DogGrid";
import LogIn from "@Components/LogIn/LogIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {isLoggedIn ? (
        <DogGrid onLogOut={() => setIsLoggedIn(false)} />
      ) : (
        <LogIn onLogIn={() => setIsLoggedIn(true)} />
      )}
      {/* <DogGrid /> */}
    </FiltersContext.Provider>
  );
}

export default App;
