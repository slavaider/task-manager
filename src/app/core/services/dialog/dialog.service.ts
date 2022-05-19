import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public confirm(data: { message: string }): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        panelClass: ['confirm-dialog'],
        disableClose: true,
      })
      .afterClosed();
  }
}
