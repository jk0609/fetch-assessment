import { useState, useReducer } from "react";
import "./App.css";
import {
  filtersReducer,
  initialState as filtersInitialState,
} from "@StateManagement/Filters/FiltersReducer";
import {
  alertReducer,
  initialState as alertInitialState,
} from "@StateManagement/Alert/AlertReducer";
import FiltersContext from "@StateManagement/Filters/FiltersContext";
import AlertContext from "@StateManagement/Alert/AlertContext";
import DogGrid from "@Components/DogGrid/DogGrid";
import LogIn from "@Components/LogIn/LogIn";
import Alert from "@Components/Alert/Alert";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [filtersState, filtersDispatch] = useReducer(
    filtersReducer,
    filtersInitialState
  );
  const filtersValue = { state: filtersState, dispatch: filtersDispatch };

  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );
  const alertValue = { state: alertState, dispatch: alertDispatch };

  return (
    <AlertContext.Provider value={alertValue}>
      <FiltersContext.Provider value={filtersValue}>
        {isLoggedIn ? (
          <DogGrid onLogOut={() => setIsLoggedIn(false)} />
        ) : (
          <LogIn onLogIn={() => setIsLoggedIn(true)} />
        )}
        <Alert />
      </FiltersContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;
