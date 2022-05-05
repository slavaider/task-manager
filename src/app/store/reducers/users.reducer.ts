import { createReducer, on } from '@ngrx/store';
import { deleteUser, loadUsersSuccess, loadUserSuccess, setUser, editUser } from '../actions/users.actions';
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
  on(editUser, (state, { modifiedUser }): IUsersState => {
    return {
      ...state, users: state.users.map(oldUser => oldUser.id === modifiedUser.id ? modifiedUser : oldUser)
    };
  }),
  on(deleteUser, (state): IUsersState => {
    return {
      ...state,
      currentUser: null,
    };
  }),
);
