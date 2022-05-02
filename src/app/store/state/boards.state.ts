import { IBoard } from 'src/app/store/models/board.model';

export interface IBoardsState {
  boards: IBoard[];
}

export const initBoardsState: IBoardsState = {
  boards: [
    // {
    //   id: "66b461b2-2344-48c3-9470-61c7fd39d73f"
    //   title: "Homework tasks"
    // },
  ],
};
