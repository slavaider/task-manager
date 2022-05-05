/* eslint-disable ngrx/no-typed-global-store */
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, mergeMap } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { TaskRequestService } from 'src/app/core/services/request/task-request.service';
import { clearBoard, loadBoard, loadBoards } from 'src/app/store/actions/boards.actions';
import { IBoard, IColumn } from 'src/app/store/models/board.model';
import { IUser } from 'src/app/store/models/user.model';
import { selectBoard } from 'src/app/store/selectors/boards.selectors';
import { selectUser } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { CreateColumnFormComponent } from '../../components/create-column-form/create-column-form.component';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  private user$ = this.store.select(selectUser);
  public user!: IUser;

  
  private board$ = this.store.select(selectBoard);
  public board!: IBoard;

  public columns!: IColumn[];

  // private order: 1 | -1 = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private taskRequest: TaskRequestService,
    public form: MatDialog,
    private dialogService: DialogService,
    private notification: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) this.store.dispatch(loadBoard({ id }));

    this.board$.subscribe((board) => {
      if (board) {
        this.board = board;
        this.columns = [...board.columns].sort((a, b) => a.order - b.order);

        // const isMinusOrder = board.columns.some((item) => item.order < 0);
        // if (isMinusOrder) {
        //   this.columns = [...board.columns].sort((a, b) => Math.abs(a.order) - Math.abs(b.order));
        //   this.order = -1;
        // } else {
        //   this.columns = [...board.columns].sort((a, b) => a.order - b.order);
        // }
      }
    });

    this.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  public createColumn() {
    this.form.open(CreateColumnFormComponent, {
      data: {
        boardId: this.board.id,
        order: this.columns.length + 1,
      },
    });
  }

  public deleteColumn() {}

  public createTask(columnId: string) {
    this.form.open(CreateTaskFormComponent, {
      data: {
        userId: this.user.id,
        boardId: this.board.id,
        columnId,
        order: Number(this.columns.find((column) => column.id === columnId)?.tasks.length) + 1
      }
    });
  }

  public editTask() {}

  public deleteTask(taskId: string, columnId: string) {
    this.dialogService
      .confirm({
        message: 'Вы уверены, что хотите удалить задачу?',
      })
      .subscribe((answer) => {
        if (answer) {
          this.taskRequest.deleteTask(
            this.board.id, columnId, taskId,
          ).subscribe(() => {
            this.store.dispatch(loadBoard({ id: this.board.id }));
          });
        }
      });
  }

  public dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns = this.columns.map((column, i) => ({ ...column, order: i + 1 }));
    // this.columns = this.columns.map((column, i) => ({ ...column, order: i + 1 }));
    // this.order = this.order === 1 ? -1 : 1;
  }

  // public update() {
  //   from(this.columns)
  //     .pipe(
  //       mergeMap((column) =>
  //         this.request.updateColumn(this.board.id, {
  //           ...column,
  //           order: (column.order + this.columns.length) * this.order,
  //         }),
  //       ),
  //     )
  //     .subscribe();
  // }

  ngOnDestroy(): void {
    this.store.dispatch(clearBoard());
  }
}
