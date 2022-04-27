import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IAuthLogin, IAuthLoginRes, IAuthRegister, IAuthRegisterRes } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public register({ name, login, password }: IAuthRegister) {
    return this.http.post<IAuthRegisterRes>('signup', {
      name,
      login,
      password,
    });
  }

  public login({ login, password }: IAuthLogin) {
    return this.http.post<IAuthLoginRes>('signin', {
      login,
      password,
    });
  }

  public logout() {
    this.cookieService.delete('token', '/');
  }

  public isLogged() {
    return this.cookieService.check('token');
  }
}
