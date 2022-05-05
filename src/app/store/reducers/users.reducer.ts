import { createReducer, on } from '@ngrx/store';
import { deleteUser, loadUsersSuccess, loadUserSuccess } from '../actions/users.actions';
import { initUsersState, IUsersState } from '../state/users.state';

export const usersReducer = createReducer(
  initUsersState,
  on(loadUsersSuccess, (state, { users, login }): IUsersState => {
    return {
      ...state,
      users,
      currentUser: users.find((user) => user.login === login) || null,
    };
  }),
  on(loadUserSuccess, (state, { user }): IUsersState => {
    return {
      ...state,
      currentUser: user,
    };
  }),
  on(deleteUser, (state): IUsersState => {
    return {
      ...state,
      currentUser: null,
    };
  }),
);
