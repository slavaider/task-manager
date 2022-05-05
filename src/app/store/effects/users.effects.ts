import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loadUsers, loadUsersSuccess } from '../actions/users.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() => this.request.getUsers().pipe(map((users) => loadUsersSuccess({ users })))),
    );
  });

  // loadUser$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadUser),
  //     switchMap(({ id }) =>
  //       this.request.getUser(id).pipe(map((user) => loadUserSuccess({ user }))),
  //     ),
  //   );
  // });

  constructor(private actions$: Actions, private request: RequestService) {}
}
