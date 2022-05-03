import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard, IColumn } from 'src/app/store/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>('/api/boards');
  }

  getBoard(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/boards/${id}`);
  }

  updateBoard(id: string, title: string) {
    const body = {
      title,
    };
    return this.http.put(`/api/boards/${id}`, body);
  }

  updateColumn(boardId: string, column: IColumn) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title: column.title,
      order: column.order,
    };
    return this.http.put(`/api/boards/${boardId}/columns/${column.id}`, body, options);
  }
}
