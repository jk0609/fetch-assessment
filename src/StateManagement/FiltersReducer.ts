import { State, Action } from "./types";

const initialState = {
  breeds: undefined,
};

const filtersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_BREEDS":
      return {
        ...state,
        breeds: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, filtersReducer };
