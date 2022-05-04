import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IBoardsState } from '../state/boards.state';

const selectBoardsState = (state: IAppState): IBoardsState => {
  return state.boardsState;
};

export const selectBoards = createSelector(selectBoardsState, (state) => state.boards);

export const selectBoard = createSelector(selectBoardsState, (state) => state.currentBoard);
