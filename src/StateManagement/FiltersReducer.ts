import { State, Action } from "./types";

const initialState = {
  breeds: [],
  sortBy: "breed",
  sortDir: "asc",
};

const filtersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_BREEDS":
      return {
        ...state,
        breeds: action.payload,
      };
    case "UPDATE_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
      };
    case "UPDATE_SORT_DIR":
      return {
        ...state,
        sortDir: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, filtersReducer };
