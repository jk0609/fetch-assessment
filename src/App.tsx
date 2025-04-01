import { useState, useReducer } from "react";
import "./App.css";
import { filtersReducer, initialState } from "./StateManagement/FiltersReducer";
import FiltersContext from "./StateManagement/FiltersContext";
import DogGrid from "./Components/DogGrid/DogGrid";
import Login from "./Components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {isLoggedIn ? <DogGrid /> : <Login onLogin={() => setIsLoggedIn(true)} />}
      {/* <DogGrid /> */}
    </FiltersContext.Provider>
  );
}

export default App;
