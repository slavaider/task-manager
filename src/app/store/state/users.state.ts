import { IUser } from '../models/user.model';

export interface IUsersState {
  users: IUser[];
  currentUser: IUser | null;
}

export const initUsersState: IUsersState = {
  users: [],
  currentUser: null,
};
