import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { ColumnRequestService } from 'src/app/core/services/request/column-request.service';
import { TaskRequestService } from 'src/app/core/services/request/task-request.service';
import { clearBoard, loadBoard } from 'src/app/store/actions/boards.actions';
import { IBoard, IColumn, ITask } from 'src/app/store/models/board.model';
import { IUser } from 'src/app/store/models/user.model';
import { selectBoard } from 'src/app/store/selectors/boards.selectors';
import { selectUser } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { CreateColumnFormComponent } from '../../components/create-column-form/create-column-form.component';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import { EditTaskFormComponent } from '../../components/edit-task-form/edit-task-form.component';

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

  public columns: IColumn[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private taskRequest: TaskRequestService,
    private columnRequest: ColumnRequestService,
    public form: MatDialog,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) this.store.dispatch(loadBoard({ id }));

    this.board$.subscribe((board) => {
      if (board) {
        this.board = board;
        this.columns = [...board.columns].sort((a, b) => a.order - b.order);

        this.columns= this.columns.map((column) => {
          return {
            ...column,
            tasks: [...column.tasks].sort((a, b) => a.order - b.order)
          }
        });
      }
    });

    this.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  public createColumn() {
    const lastColumn = this.columns[this.columns.length-1];
    const order = (lastColumn ? lastColumn.order : 0) + 1;
  
    this.form.open(CreateColumnFormComponent, {
      data: {
        boardId: this.board.id,
        order,
      },
    });
  }

  public deleteColumn(columnId: string) {
    this.dialogService
      .confirm({
        message: 'Вы уверены, что хотите удалить колонку?',
      })
      .subscribe((answer) => {
        if (answer) {
          this.columnRequest.deleteColumn(
            this.board.id, columnId,
          ).subscribe(() => {
            this.store.dispatch(loadBoard({ id: this.board.id }));
          });
        }
      });
  }

  public createTask(columnId: string) {
    const currentColumn = this.columns.find((column) => column.id === columnId);
    const lastTask = currentColumn?.tasks[currentColumn?.tasks.length - 1];
    const order = (lastTask ? lastTask.order : 0) + 1
  
    this.form.open(CreateTaskFormComponent, {
      data: {
        userId: this.user.id,
        boardId: this.board.id,
        columnId,
        order,
      }
    });
  }

  public editTask(task: ITask, columnId: string) {
    this.form.open(EditTaskFormComponent, {
      data: { 
        task,
        boardId: this.board.id,
        columnId,
      }
    });
  }

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

  public dropTask(event: CdkDragDrop<IColumn>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
  
      event.container.data.tasks.forEach((task, i) => {
        const {
          userId, id: taskId, title, description, done,
        } = task;

        this.taskRequest.editTask({
          userId,
          boardId: this.board.id,
          columnId: event.container.data.id,
          taskId,
          order: (i + 1),
          title,
          description,
        }).subscribe();
      })
      
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );

      event.previousContainer.data.tasks.forEach((task, i) => {
        const {
          userId, id: taskId, title, description, done,
        } = task;

        this.taskRequest.editTask({
          userId,
          boardId: this.board.id,
          columnId: event.previousContainer.data.id,
          taskId,
          order: (i + 1),
          title,
          description,
        }).subscribe();
      })

      event.container.data.tasks.forEach((task, i) => {
        const {
          userId, id: taskId, title, description, done,
        } = task;

        const previousColumnId = event.currentIndex === i
          ? event.previousContainer.data.id
          : event.container.data.id;

        this.taskRequest.editMovedTask({
          userId,
          boardId: this.board.id,
          previousColumnId, 
          columnId: event.container.data.id,
          taskId,
          order: (i + 1),
          title,
          description,
        }).subscribe();
      })
    }
  }

  public dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    this.columns.forEach((column, i) => {
      const { id, title, order } = column;
      const nextOrder = order > 100000 ? i + 1 : i + 100001; // 100000 temp index
      column.order = nextOrder;
      this.columnRequest.updateColumn(this.board.id, id, title, nextOrder).subscribe();
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBoard());
  }
}
