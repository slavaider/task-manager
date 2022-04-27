import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { HandleErrorService } from 'src/app/core/services/handleError/handle-error.service';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(private errorService: HandleErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
    );
  }
}
