import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAuthLogin, IAuthLoginRes, IAuthRegister, IAuthRegisterRes } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  public register({ name, login, password }: IAuthRegister) {
    const body = { name, login, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<IAuthRegisterRes>('/api/signup', body, options);
  }

  public login({ login, password }: IAuthLogin) {
    const body = { login, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<IAuthLoginRes>('/api/signin', body, options);
  }

  public logout() {
    this.cookieService.delete('token', '/');
    this.router.navigateByUrl('/welcome');
  }

  public isLogged() {
    return this.cookieService.check('token');
  }
}
