import { createAction, props } from '@ngrx/store';
import { IBoard } from 'src/app/task-manager/models/board.model';

export const loadBoards = createAction('[Source] [Main Page], Load Boards');

export const loadBoardsSuccess = createAction(
  '[Source] [Boards API], Boards Loaded Success',
  props<{ boards: IBoard[] }>(),
);
