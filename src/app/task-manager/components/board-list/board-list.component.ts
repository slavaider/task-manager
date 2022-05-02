/* eslint-disable ngrx/no-typed-global-store */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoards } from 'src/app/store/selectors/boards.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { IBoard } from '../../../store/models/board.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent {
  public boards$: Observable<IBoard[]> = this.store.select(selectBoards);

  constructor(private readonly store: Store<IAppState>) {}
}
