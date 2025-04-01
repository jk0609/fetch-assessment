type State = {
  breeds: string[];
  sortBy: string;
  sortDir: string;
};

type Action =
  | {
      type: "UPDATE_BREEDS";
      payload: string[];
    }
  | { type: "UPDATE_SORT_BY"; payload: string }
  | { type: "UPDATE_SORT_DIR"; payload: string };

export type { State, Action };
