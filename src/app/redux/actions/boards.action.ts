import { createAction, props } from '@ngrx/store';
import { ACTIONS_NAMES, IBoard, IColumn, ITask } from '../boardState.models';

// BOARDS
export const getBoards = createAction(ACTIONS_NAMES.GET_BOARDS);

export const getBoardsSuccessful = createAction(
  ACTIONS_NAMES.GET_BOARDS_SUCCESSFUL,
  props<{ boards: IBoard[] }>(),
);

export const getBoardsFailed = createAction(
  ACTIONS_NAMES.GET_BOARDS_FAILED,
  props<{ error: Error }>(),
);

export const getBoard = createAction(ACTIONS_NAMES.GET_BOARD, props<{ boardId: string }>());

export const postBoard = createAction(ACTIONS_NAMES.POST_BOARD, props<{ newBoard: IBoard }>());

export const deleteBoard = createAction(ACTIONS_NAMES.DELETE_BOARD, props<{ boardId: string }>());

export const putBoard = createAction(ACTIONS_NAMES.PUT_BOARD, props<{ modifiedBoard: IBoard }>());

// COLUMNS
export const getColumns = createAction(ACTIONS_NAMES.GET_COLUMNS, props<{ boardId: string }>());

export const getColumn = createAction(
  ACTIONS_NAMES.GET_COLUMN,
  props<{ boardId: string; columnId: string }>(),
);

export const postColumn = createAction(
  ACTIONS_NAMES.POST_COLUMN,
  props<{ boardId: string; newColumn: IColumn }>(),
);

export const deleteColumn = createAction(
  ACTIONS_NAMES.DELETE_COLUMN,
  props<{ boardId: string; columnId: string }>(),
);

export const putColumn = createAction(
  ACTIONS_NAMES.PUT_COLUMN,
  props<{ boardId: string; modifiedColumn: IColumn }>(),
);

// TASKS
export const getTasks = createAction(
  ACTIONS_NAMES.GET_TASKS,
  props<{ boardId: string; columnId: string }>(),
);

export const getTask = createAction(
  ACTIONS_NAMES.GET_TASK,
  props<{ boardId: string; columnId: string; idTask: string }>(),
);

export const postTask = createAction(
  ACTIONS_NAMES.POST_TASK,
  props<{ boardId: string; columnId: string; newTask: ITask }>(),
);

export const deleteTask = createAction(
  ACTIONS_NAMES.DELETE_TASK,
  props<{ boardId: string; columnId: string; idTask: string }>(),
);

export const putTask = createAction(
  ACTIONS_NAMES.PUT_TASK,
  props<{ boardId: string; columnId: string; modifiedTask: ITask }>(),
);
