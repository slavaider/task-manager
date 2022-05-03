import { createAction, props } from '@ngrx/store';
import { IBoard } from 'src/app/store/models/board.model';

export const loadBoards = createAction('[Source] [Boards Page], Load Boards');

export const loadBoardsSuccess = createAction(
  '[Source] [Boards API], Boards Loaded Success',
  props<{ boards: IBoard[] }>(),
);
