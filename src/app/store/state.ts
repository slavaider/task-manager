import { IBoard } from "../redux/state.models";

export interface AppState {
  boards: IBoard[];
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  userIsAutorised: boolean;
}


