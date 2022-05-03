import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private notification: MatSnackBar, private router: Router, private zone: NgZone) {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      switch (error.error.statusCode) {
        case 401:
          this.zone.run(() => {
            this.router.navigate(['/welcome']);
          });
          break;
        default:
          this.zone.run(() => {
            this.notification.open(error.error.message, 'ok', {
              duration: 4000,
              panelClass: ['note-error'],
            });
          });
      }
    } else console.error(error);
  }
}
