import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loadBoards, loadBoardsSuccess } from '../actions/boards.actions';

@Injectable()
export class BoardsEffects {
  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() =>
        this.request.getBoards().pipe(map((boards) => loadBoardsSuccess({ boards }))),
      ),
    );
  });

  constructor(private actions$: Actions, private request: RequestService) {}
}
