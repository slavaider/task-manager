import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
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
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private notification: MatSnackBar,
    private request: BoardRequestService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) {}

  public get title(): AbstractControl | null {
    return this.createForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.createForm.get('description');
  }

  public submit() {
    const { title, description } = this.createForm.value;
    this.request.createBoard(title, description).subscribe(() => {
      this.store.dispatch(loadBoards());

      this.notification.open(this.i18NextService.t('words.boardCreated'), 'ok', {
      // this.notification.open(`Доска создана`, 'ok', {
        duration: 4000,
        panelClass: ['note-success'],
      });
    });
  }
}
