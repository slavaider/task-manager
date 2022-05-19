import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IUsersState } from '../state/users.state';

const selectUsersState = (state: IAppState): IUsersState => {
  return state.usersState;
};

export const selectUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUser = createSelector(selectUsersState, (state) => state.currentUser);
