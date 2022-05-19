import { IBoard } from 'src/app/store/models/board.model';

export interface IBoardsState {
  boards: IBoard[];
  currentBoard: IBoard | null;
}

export const initBoardsState: IBoardsState = {
  boards: [],
  currentBoard: null,
};
