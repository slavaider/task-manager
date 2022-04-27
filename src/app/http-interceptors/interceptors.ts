import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BaseInterceptor } from './base/base.interceptor';
import { ServerErrorsInterceptor } from './serverErrors/server-errors.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
];
