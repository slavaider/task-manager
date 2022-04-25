import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthRegister } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register({ name, login, password }: IAuthRegister) {
    const body = { name, login, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post('http://v1115797.hosted-by-vdsina.ru:4000/signup', body, options);
  }
}
