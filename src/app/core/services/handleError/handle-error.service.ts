import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private notification: MatSnackBar) {}

  handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error) {
      message = error.error.message;
    } else {
      message = 'Something went wrong!';
    }
    this.notification.open(message, 'ok', { duration: 4000, panelClass: ['note-error'] });
    return throwError(() => message);
  }
}
