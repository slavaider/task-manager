/* eslint-disable ngrx/no-typed-global-store */
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, mergeMap } from 'rxjs';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';
import { IBoard, IColumn } from 'src/app/store/models/board.model';
import { selectBoard } from 'src/app/store/selectors/boards.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  public board$ = this.store.select(selectBoard);

  public board!: IBoard;

  public columns: IColumn[] = [];

  private order: 1 | -1 = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private request: RequestService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) this.store.dispatch(loadBoard({ id }));

    this.board$.subscribe((board) => {
      if (board) {
        this.board = board;
        const isMinusOrder = board.columns.some((item) => item.order < 0);
        if (isMinusOrder) {
          this.columns = [...board.columns].sort((a, b) => Math.abs(a.order) - Math.abs(b.order));
          this.order = -1;
        } else {
          this.columns = [...board.columns].sort((a, b) => a.order - b.order);
        }
      }
    });
  }

  public dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns = this.columns.map((column, i) => ({ ...column, order: i + 1 }));
    this.order = this.order === 1 ? -1 : 1;
  }

  public update() {
    from(this.columns)
      .pipe(
        mergeMap((column) =>
          this.request.updateColumn(this.board.id, {
            ...column,
            order: (column.order + this.columns.length) * this.order,
          }),
        ),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    console.log('bye');
  }
}
