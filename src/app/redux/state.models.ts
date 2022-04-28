export namespace ITEMS_ACTIONS {
  export const GET_BOARDS = 'GET_BOARDS';
  export const GET_BOARD = ' GET_BOARD';
  export const POST_BOARD = 'POST_BOARD';
  export const DELETE_BOARD = 'DELETE_BOARD';
  export const PUT_BOARD = 'PUT_BOARD';

  export const GET_COLUMNS = 'GET_COLUMNS';
  export const GET_COLUMN = ' GET_COLUMN';
  export const POST_COLUMN = 'POST_COLUMN';
  export const DELETE_COLUMN = 'DELETE_COLUMN';
  export const PUT_COLUMN = 'PUT_COLUMN';

  export const GET_TASKS = 'GET_TASKS';
  export const GET_TASK = ' GET_TASK';
  export const POST_TASK = 'POST_TASK';
  export const DELETE_TASK = 'DELETE_TASK';
  export const PUT_TASK = 'PUT_TASK';

  export const GET_FILE = ' GET_FILE';
  export const POST_FILE = 'POST_FILE';
}

export interface IBoard {
  id: string;
  title: string;
  order: number;
  columns: IColumns[];
}

export interface IColumns {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  boardId: string;
  files: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

export interface IUsers {
  id: string;
  name: string;
  login: string;
  password: string;
}
