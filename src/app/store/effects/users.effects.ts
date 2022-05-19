import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { UserRequestService } from 'src/app/core/services/request/user-request.service';
import { loadUsers, loadUsersSuccess } from '../actions/users.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(({ login }) => {
        return this.request.getUsers().pipe(
          map((users) => loadUsersSuccess({ users, login })),
        );
      }) 
    )
  });

  // loadUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadUser),
  //     switchMap(({ id }) =>
  //       this.request.getUser(id).pipe(map((user) => loadUserSuccess({ user }))),
  //     ),
  //   );
  // });

  constructor(private actions$: Actions, private request: UserRequestService) {}
}
