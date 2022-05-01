import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from '../boardState.models';
import { AppState } from 'src/app/store/state';
import * as boardActions from '../actions/boards.action';
import { BoardState } from '../boardState';

const arrayBoards: IBoard[] = [];
const initialState: BoardState = {
  boards: arrayBoards,
  loading: false,
  loaded: false,
  error: null,
  // userIsAutorised: false,
};

const reducer = createReducer(
  initialState,

  // BOARDS
  on(boardActions.getBoards, (state) => {
    console.log('getBoards', state);
    return { ...state, loading: true, loaded: false };
  }),

  on(boardActions.getBoardsSuccessful, (state, { boards }) => {
    console.log('getBoardsSuccessful', state);
    return { ...state, boards, loading: false, loaded: true };
  }),

  on(boardActions.getBoardsFailed, (state, { error }) => {
    console.log('getBoardsFailed', state);
    return { ...state, error, loading: false, loaded: false };
  }),

  on(boardActions.getBoard, (state, { id }) => {
    console.log('getBoard', state);
    return { ...state };
  }),

  on(boardActions.postBoard, (state, { newBoard }) => {
    console.log('postBoard', state);
    return { ...state, boards: [...state.boards, newBoard], loading: false, loaded: true };
  }),

  on(boardActions.deleteBoard, (state, { id }) => {
    console.log('filteredBoards', state);
    const filteredBoards = state.boards.filter(function (e) {
      return e.id !== id;
    });
    return { ...state, boards: filteredBoards};
  }),

  on(boardActions.putBoard, (state, { modifiedBoard }) => {
    console.log('getBoards', state);
    const filteredBoards = state.boards.map((e) => {
      if (e.id === modifiedBoard.id) {
        e.title = modifiedBoard.title;
        e.order = modifiedBoard.order;
      }
      return e;
    });
    return { ...state, boards: filteredBoards };
  }),

  // COLUMNS
  on(boardActions.getColumns, (state, { boardId }) => {
    console.log('getColumns', state);
    return { ...state };
  }),

  on(boardActions.getColumn, (state, { boardId, id }) => {
    console.log('getColumn', state);
    return { ...state };
  }),

  on(boardActions.postColumn, (state, { boardId, newColumn }) => {
    console.log('postColumn', state);
    const filteredBoards = state.boards.map((e) => {
      if (e.id === boardId) {
        e.columns = [...e.columns, newColumn];
      }
      return e;
    });
    return { ...state, boards: filteredBoards };
  }),

  on(boardActions.deleteColumn, (state, { boardId, id }) => {
    console.log('deleteColumn', state);
    const filteredBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.filter(function (curColumn) {
          return curColumn.id !== id;
        });
      }
      return curBoard;
    });
    return { ...state, boards: filteredBoards };
  }),

  on(boardActions.putColumn, (state, { boardId, id, modifiedColumn }) => {
    console.log('putColumn', state);
    const filteredBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.map((curColumn) => {
          if (curColumn.id === id) {
            curColumn.order = modifiedColumn.order;
            curColumn.title = modifiedColumn.title;
          }
          return curColumn;
        });
      }
      return curBoard;
    });
    return { ...state, boards: filteredBoards };
  }),

);

export function itemsReducer(state: BoardState, action: Action) {
  return reducer(state, action);
}
