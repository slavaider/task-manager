import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from '../boardState.models';
import * as boardActions from '../actions/boards.action';
import { BoardState } from '../boardState';

const arrayBoards: IBoard[] = [];
const initialState: BoardState = {
  boards: arrayBoards,
  loading: false,
  loaded: false,
  error: null,
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

  on(boardActions.getBoard, (state, { boardId }) => {
    console.log('getBoard', state, boardId);
    return { ...state };
  }),

  on(boardActions.postBoard, (state, { newBoard }) => {
    console.log('postBoard', state);
    return { ...state, boards: [...state.boards, newBoard], loading: false, loaded: true };
  }),

  on(boardActions.deleteBoard, (state, { boardId }) => {
    console.log('deleteBoard', state);
    const changedBoards = state.boards.filter(function (curBoard) {
      return curBoard.id !== boardId;
    });
    return { ...state, boards: changedBoards };
  }),

  on(boardActions.putBoard, (state, { modifiedBoard }) => {
    console.log('getBoards', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === modifiedBoard.id) {
        curBoard.title = modifiedBoard.title;
        curBoard.order = modifiedBoard.order;
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  // COLUMNS
  on(boardActions.getColumns, (state, { boardId }) => {
    console.log('getColumns', state, boardId);
    return { ...state };
  }),

  on(boardActions.getColumn, (state, { boardId, columnId }) => {
    console.log('getColumn', state, boardId, columnId);
    return { ...state };
  }),

  on(boardActions.postColumn, (state, { boardId, newColumn }) => {
    console.log('postColumn', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = [...curBoard.columns, newColumn];
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  on(boardActions.deleteColumn, (state, { boardId, columnId }) => {
    console.log('deleteColumn', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.filter(function (curColumn) {
          return curColumn.id !== columnId;
        });
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  on(boardActions.putColumn, (state, { boardId, modifiedColumn }) => {
    console.log('putColumn', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.map((curColumn) => {
          if (curColumn.id === modifiedColumn.id) {
            curColumn.order = modifiedColumn.order;
            curColumn.title = modifiedColumn.title;
          }
          return curColumn;
        });
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  // TASKS
  on(boardActions.getTasks, (state, { boardId, columnId }) => {
    console.log('getTasks', state, boardId, columnId);
    return { ...state };
  }),

  on(boardActions.getTask, (state, { boardId, columnId, idTask }) => {
    console.log('getTask', state, boardId, columnId, idTask);
    return { ...state };
  }),

  on(boardActions.postTask, (state, { boardId, columnId, newTask }) => {
    console.log('postTask', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.map((curColumn) => {
          if (curColumn.id === columnId) {
            curColumn.tasks = [...curColumn.tasks, newTask];
          }
          return curColumn;
        });
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  on(boardActions.deleteTask, (state, { boardId, columnId, idTask }) => {
    console.log('deleteTask', state, boardId, columnId, idTask);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.map((curColumn) => {
          if (curColumn.id === columnId) {
            const changedTasks = curColumn.tasks.filter(function (curTask) {
              return curTask.id !== idTask;
            });
            curColumn.tasks = changedTasks;
          }
          return curColumn;
        });
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),

  on(boardActions.putTask, (state, { boardId, columnId, modifiedTask }) => {
    console.log('putTask', state);
    const changedBoards = state.boards.map((curBoard) => {
      if (curBoard.id === boardId) {
        curBoard.columns = curBoard.columns.map((curColumn) => {
          if (curColumn.id === columnId) {
            const changedTasks = curColumn.tasks.map((curTask) => {
              if (curTask.id === modifiedTask.id) {
                return modifiedTask;
              } else {
                return curTask;
              }
            });
            curColumn.tasks = changedTasks;
          }
          return curColumn;
        });
      }
      return curBoard;
    });
    return { ...state, boards: changedBoards };
  }),
);

export function itemsReducer(state: BoardState, action: Action) {
  return reducer(state, action);
}
