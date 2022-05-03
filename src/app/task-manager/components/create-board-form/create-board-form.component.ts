import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent {
  public createForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private notification: MatSnackBar,
  ) {}

}
