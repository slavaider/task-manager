import { createAction, props } from '@ngrx/store';
import { IBoard } from 'src/app/store/models/board.model';

export const loadBoards = createAction('[Source] [Boards Page], Load Boards');

export const loadBoardsSuccess = createAction(
  '[Source] [Boards API], Boards Loaded Success',
  props<{ boards: IBoard[] }>(),
);

export const loadBoard = createAction('[Source] [Board Page], Load Board', props<{ id: string }>());

export const loadBoardSuccess = createAction(
  '[Source] [Board API], Board Loaded Success',
  props<{ board: IBoard }>(),
);
