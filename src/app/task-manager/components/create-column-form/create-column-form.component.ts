import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { RequestService } from 'src/app/core/services/request/request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';

@Component({
  selector: 'app-create-column-form',
  templateUrl: './create-column-form.component.html',
  styleUrls: ['./create-column-form.component.scss'],
})
export class CreateColumnFormComponent {
  public createForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private notification: MatSnackBar,
    private request: RequestService,
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; order: number },
  ) {}

  public get title(): AbstractControl | null {
    return this.createForm.get('title');
  }

  public submit() {
    const { title } = this.createForm.value;
    const { boardId: id, order } = this.data;

    this.request.createColumn(id, title, order).subscribe(() => {
      this.store.dispatch(loadBoard({ id }));
    });
  }
}
