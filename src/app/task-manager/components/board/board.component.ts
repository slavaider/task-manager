import { Component, Input } from '@angular/core';
import { IBoard } from '../../../store/models/board.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from 'src/app/shared/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  public board: IBoard | null = null;

  constructor(public dialog: MatDialog) {}

  public delete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = 'Удалить доску?';
    const dialogRef = this.dialog.open(ModalDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
