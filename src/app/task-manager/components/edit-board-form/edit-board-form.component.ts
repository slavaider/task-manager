import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import { loadBoards } from 'src/app/store/actions/boards.actions';

@Component({
  selector: 'app-edit-board-form',
  templateUrl: './edit-board-form.component.html',
  styleUrls: ['./edit-board-form.component.scss']
})
export class EditBoardFormComponent {
  public editForm: FormGroup = this.fb.group({
    title: [this.data.title, Validators.required],
    description: [this.data.description, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private request: BoardRequestService,
    private notification: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, title: string, description: string },
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) {}

  public get title(): AbstractControl | null {
    return this.editForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.editForm.get('description');
  }

  public submit() {
    const { title, description } = this.editForm.value;

    this.request.editBoard(this.data.id, title, description).subscribe(() => {
      this.store.dispatch(loadBoards());

      this.notification.open(`${this.i18NextService.t('words.board')} ${this.data.title} ${this.i18NextService.t('words.updated')}`, 'ok', {
        duration: 4000,
        panelClass: ['note-success'],
      });
    });
  }
}
