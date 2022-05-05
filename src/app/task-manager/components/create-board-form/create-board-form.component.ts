import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import { loadBoards } from 'src/app/store/actions/boards.actions';

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
    private store: Store,
    private notification: MatSnackBar,
    private request: BoardRequestService,
  ) {}

  public get title(): AbstractControl | null {
    return this.createForm.get('title');
  }

  public submit() {
    const { title } = this.createForm.value;
    this.request.createBoard(title).subscribe(() => {
      this.store.dispatch(loadBoards());

      this.notification.open(`Доска создана`, 'ok', {
        duration: 4000,
        panelClass: ['note-success'],
      });
    });
  }
}
