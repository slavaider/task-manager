import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/store/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardRequestService {

  constructor(private http: HttpClient) { }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('/api/boards');
  }

  getBoard(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/boards/${id}`);
  }

  createBoard(title: string, description: string): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      description,
    };
    return this.http.post('/api/boards', body, options);
  }


  deleteBoard(id: string): Observable<object> {
    return this.http.delete(`/api/boards/${id}`);
  }
}
