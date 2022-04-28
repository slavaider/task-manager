import { IBoard } from "../redux/state.models";

export interface AppState {
  boards: IBoard[];
  userIsAutorised: boolean;
}


