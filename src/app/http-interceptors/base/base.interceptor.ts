import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/config';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updateRequest = request.clone({
      url: `${BASE_URL}${request.url}`,
    });

    return next.handle(updateRequest);
  }
}
