import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
  }
}
