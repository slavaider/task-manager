import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import {
  loadBoard,
  loadBoards,
  loadBoardsSuccess,
  loadBoardSuccess,
} from '../actions/boards.actions';

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

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoard),
      switchMap(({ id }) =>
        this.request.getBoard(id).pipe(map((board) => loadBoardSuccess({ board }))),
      ),
    );
  });

  constructor(private actions$: Actions, private request: BoardRequestService) {}
}
