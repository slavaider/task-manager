import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskRequestService } from 'src/app/core/services/request/task-request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';
import { ITask } from 'src/app/store/models/board.model';
import { IUser } from 'src/app/store/models/user.model';

@Component({
  selector: 'app-change-user-form',
  templateUrl: './change-user-form.component.html',
  styleUrls: ['./change-user-form.component.scss']
})
export class ChangeUserFormComponent {
  public changeForm: FormGroup = this.fb.group({
    nextOwner: [this.data.users],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private request: TaskRequestService,
    @Inject(MAT_DIALOG_DATA) public data: {
      users: IUser[], user: IUser, boardId: string, columnId: string, task: ITask
    },
  ) {}

  public submit() {
    const { nextOwner } = this.changeForm.value;
    const { boardId, columnId, task } = this.data;
    const { id: taskId, order, title, description } = task;

    this.request.editTask({
      userId: nextOwner, boardId, columnId, taskId, order, title, description,
    }).subscribe(() => {
      this.store.dispatch(loadBoard({ id: boardId }));
    });
  }
}
