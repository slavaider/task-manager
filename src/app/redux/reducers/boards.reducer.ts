import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from '../state.models';
import { AppState } from 'src/app/store/state';
import * as boardActions from '../actions/boards.action';

const arrayBoards: IBoard[] = [];
const initialState: AppState = {
  boards: arrayBoards,
  loading: false,
  loaded: false,
  error: null,
  userIsAutorised: false,
};

const reducer = createReducer(
  initialState,

  // BOARDS
  on(boardActions.getBoards, (state) => {
    console.log('getBoards', state);
    return { ...state, loading: true, loaded: false };
  }),

  on(boardActions.getBoardsSuccessful, (state, { boards }) => {
    console.log('getBoards', state);
    return { ...state, boards, loading: false, loaded: true };
  }),

  on(boardActions.getBoardsFailed, (state, { error }) => {
    console.log('getBoards', state);
    return { ...state, error, loading: false, loaded: false };
  }),

  on(boardActions.getBoard, (state, { id }) => {
    console.log('getBoards', state);
    return { ...state };
  }),

  on(boardActions.postBoard, (state) => {
    console.log('getBoards', state);
    return { ...state };
  }),

  on(boardActions.deleteBoard, (state) => {
    console.log('getBoards', state);
    return { ...state };
  }),

  on(boardActions.putBoard, (state) => {
    console.log('getBoards', state);
    return { ...state };
  }),
);
