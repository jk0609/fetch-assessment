type State = {
  breeds: string[];
  sortBy: string;
  sortDir: string;
  age: number[];
};

type Action =
  | {
      type: "UPDATE_BREEDS";
      payload: string[];
    }
  | { type: "UPDATE_SORT_BY"; payload: string }
  | { type: "UPDATE_SORT_DIR"; payload: string }
  | { type: "UPDATE_AGE"; payload: number[] };

export type { State, Action };
