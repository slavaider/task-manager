import { createAction, props } from '@ngrx/store';
import { IAuthRegister } from 'src/app/auth/models/auth.models';
import { IUser } from '../models/user.model';

export const loadUsers = createAction('[Source] [App Component], Load Users');

export const loadUsersSuccess = createAction(
  '[Source] [Users API], Users Loaded Success',
  props<{ users: IUser[] }>(),
);

export const loadUser = createAction('[Source] [User Page], Load User', props<{ id: string }>());

export const loadUserSuccess = createAction(
  '[Source] [User API], User Loaded Success',
  props<{ user: IUser }>(),
);

export const setUser = createAction('[Source] [Login Page], Set User', props<{ login: string }>());

export const editUser = createAction('[Source] [Login Page], Edit User', props<{ modifiedUser: IUser }>());

export const deleteUser = createAction('[Source] [User Page], Delete User');
