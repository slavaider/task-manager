import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import { loadBoards } from 'src/app/store/actions/boards.actions';
import { IBoard } from '../../../store/models/board.model';

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
  ) {}

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
