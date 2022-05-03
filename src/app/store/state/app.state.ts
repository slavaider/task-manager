import { IBoardsState, initBoardsState } from './boards.state';

export interface IAppState {
  boardsState: IBoardsState;
}

export const initAppState: IAppState = {
  boardsState: initBoardsState,
};
