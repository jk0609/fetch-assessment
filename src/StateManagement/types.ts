type State = {
  breeds: string[] | undefined;
};

type Action = {
  type: "UPDATE_BREEDS";
  payload: string[];
};

export type { State, Action };
