import { IBoard } from "./boardState.models";

export interface BoardState {
  boards: IBoard[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  // userIsAutorised: boolean;
}


