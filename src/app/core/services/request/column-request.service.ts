import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnRequestService {

  constructor(private http: HttpClient) { }

  createColumn(boardId: string, title: string, order: number): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      order,
    };
    return this.http.post(`/api/boards/${boardId}/columns`, body, options);
  }

  deleteColumn(boardId: string, columnId: string): Observable<object> {
    return this.http.delete(`/api/boards/${boardId}/columns/${columnId}`);
  }

  updateColumn(boardId: string, columnId: string, title: string, order: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      order,
    };
    return this.http.put(`/api/boards/${boardId}/columns/${columnId}`, body, options);
  }
}
