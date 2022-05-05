import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskRequestService } from 'src/app/core/services/request/task-request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';
import { ITask } from 'src/app/store/models/board.model';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent {
  public editForm: FormGroup = this.fb.group({
    title: [this.data.task.title, Validators.required],
    description: [this.data.task.description, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private request: TaskRequestService,
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask, boardId: string, columnId: string },
  ) {}

  public get title(): AbstractControl | null {
    return this.editForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.editForm.get('description');
  }

  public submit() {
    const { title, description } = this.editForm.value;
    const { task, boardId, columnId } = this.data
    const { userId, id: taskId, order } = task;

    this.request.editTask({
      userId, boardId, columnId, taskId, order, title, description,
    }).subscribe(() => {
      this.store.dispatch(loadBoard({ id: boardId }));
    });
  }
}
