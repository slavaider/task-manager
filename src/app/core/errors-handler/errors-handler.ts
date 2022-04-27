import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private notification: MatSnackBar, private router: Router, private zone: NgZone) {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      if (error.error.statusCode === 401) {
        this.zone.run(() => {
          this.router.navigate(['/auth/login']);
        });
      } else {
        this.zone.run(() => {
          this.notification.open(error.error.message, 'ok', {
            duration: 4000,
            panelClass: ['note-error'],
          });
        });
      }
    }
  }
}
