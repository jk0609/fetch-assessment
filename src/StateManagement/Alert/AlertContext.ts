import { createContext, Dispatch } from "react";
import { State, Action } from "./types";
import { initialState } from "./AlertReducer";

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const AlertContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export default AlertContext;
