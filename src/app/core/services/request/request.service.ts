import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/store/models/board.model';
import { IUser } from 'src/app/store/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  // USER //
  // getUsers(): Observable<IUser[]> {
  //   return this.http.get<IUser[]>('/api/users');
  // }
  // BOARD //

  // getBoards(): Observable<IBoard[]> {
  //   return this.http.get<IBoard[]>('/api/boards');
  // }

  // getBoard(id: string): Observable<IBoard> {
  //   return this.http.get<IBoard>(`/api/boards/${id}`);
  // }

  // createBoard(title: string): Observable<object> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const body = {
  //     title,
  //   };
  //   return this.http.post('/api/boards', body, options);
  // }


  // deleteBoard(id: string): Observable<object> {
  //   return this.http.delete(`/api/boards/${id}`);
  // }

  // COLUMN //

  // createColumn(boardId: string, title: string, order: number): Observable<object> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const body = {
  //     title,
  //     order,
  //   };
  //   return this.http.post(`/api/boards/${boardId}/columns`, body, options);
  // }

  // updateColumn(boardId: string, column: IColumn) {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const body = {
  //     title: column.title,
  //     order: column.order,
  //   };
  //   return this.http.put(`/api/boards/${boardId}/columns/${column.id}`, body, options);
  // }
}
