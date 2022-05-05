import { createReducer, on } from '@ngrx/store';
import { deleteUser, loadUsersSuccess, loadUserSuccess, setUser } from '../actions/users.actions';
import { initUsersState, IUsersState } from '../state/users.state';

export const usersReducer = createReducer(
  initUsersState,
  on(loadUsersSuccess, (state, { users }): IUsersState => {
    return {
      ...state,
      users,
    };
  }),
  on(loadUserSuccess, (state, { user }): IUsersState => {
    return {
      ...state,
      currentUser: user,
    };
  }),
  on(setUser, (state, { login }): IUsersState => {
    return {
      ...state,
      currentUser: state.users.find((user) => user.login === login) || null,
    };
  }),
  on(deleteUser, (state): IUsersState => {
    return {
      ...state,
      currentUser: null,
    };
  }),
);
