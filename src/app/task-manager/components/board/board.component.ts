import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import { loadBoards } from 'src/app/store/actions/boards.actions';
import { IBoard } from '../../../store/models/board.model';
import { EditBoardFormComponent } from '../edit-board-form/edit-board-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  public board!: IBoard;

  constructor(
    private dialogService: DialogService,
    private store: Store,
    private request: BoardRequestService,
    private notification: MatSnackBar,
    public form: MatDialog,
  ) {}

  public editBoard() {
    this.form.open(EditBoardFormComponent, {
      data: { 
        id: this.board.id,
        title: this.board.title,
        description: this.board.description,
      }
    });
  }

  public deleteBoard() {
    this.dialogService
      .confirm({
        message: 'Вы уверены, что хотите удалить доску?',
      })
      .subscribe((answer) => {
        if (answer) {
          this.request.deleteBoard(this.board.id).subscribe(() => {
            this.store.dispatch(loadBoards());

            this.notification.open(`Доска удалена`, 'ok', {
              duration: 4000,
              panelClass: ['note-success'],
            });
          });
        }
      });
  }
}
