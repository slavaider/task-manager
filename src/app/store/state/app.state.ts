import { IBoardsState, initBoardsState } from './boards.state';
import { IUsersState, initUsersState } from './users.state';

export interface IAppState {
  boardsState: IBoardsState;
  usersState: IUsersState;
}

export const initAppState: IAppState = {
  boardsState: initBoardsState,
  usersState: initUsersState,
};
