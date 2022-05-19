import { boardsReducer } from './boards.reducer';
import { usersReducer } from './users.reducer';

export const reducers = {
  boardsState: boardsReducer,
  usersState: usersReducer,
};
