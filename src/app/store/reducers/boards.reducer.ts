import { createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardSuccess } from '../actions/boards.actions';
import { IBoardsState, initBoardsState } from '../state/boards.state';

export const boardsReducer = createReducer(
  initBoardsState,
  on(loadBoardsSuccess, (state, { boards }): IBoardsState => {
    return {
      ...state,
      boards,
    };
  }),
  on(loadBoardSuccess, (state, { board }): IBoardsState => {
    return {
      ...state,
      currentBoard: board,
    };
  }),
);
