import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRegister } from 'src/app/auth/models/auth.models';
import { IUser } from 'src/app/store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
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

  public deleteUser(id: string) {
    return this.http.delete(`/api/users/${id}`);
  }
}
