import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TaskRequestService } from 'src/app/core/services/request/task-request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';

interface ITaskData {
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
}

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent {
  public createForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private request: TaskRequestService,
    @Inject(MAT_DIALOG_DATA) public data: ITaskData,
  ) {}

  public get title(): AbstractControl | null {
    return this.createForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.createForm.get('description');
  }

  public submit() {
    const { title, description } = this.createForm.value;
    const { userId, boardId, columnId, order } = this.data;

    this.request.createTask({
      userId, boardId, columnId, order, title, description,
    }).subscribe(() => {
      this.store.dispatch(loadBoard({ id: boardId }));
    });
  }
}
