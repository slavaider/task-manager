import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/store/models/user.model';
import { IAuthLogin, IAuthLoginRes, IAuthRegister, IAuthRegisterRes } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private trackLogin = new Subject<boolean>();

  public trackLogin$ = this.trackLogin.asObservable();

  public currentUserLogin: string = '';

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

  public editUser(id: string, { name, login, password }: IAuthRegister) {
    const body = { name, login, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<IAuthRegister>(`/api/users/${id}`, body, options);
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
    this.cookieService.delete('login', '/');

    this.updateTrackLogin(false);
    this.router.navigateByUrl('/welcome');
    this.currentUserLogin = '';
  }

  public updateTrackLogin(value: boolean) {
    this.trackLogin.next(value);
  }

  public isLogged() {
    return this.cookieService.check('token');
  }
}
