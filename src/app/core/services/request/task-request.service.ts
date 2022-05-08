import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITaskProps {
  order: number;
  userId: string;
  boardId: string;
  previousColumnId?: string;
  columnId: string;
  taskId?: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskRequestService {

  constructor(private http: HttpClient) {}

  createTask({
    userId, boardId, columnId, order, title, description
  }: ITaskProps): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      order,
      description,
      userId,
    };
    return this.http.post(`/api/boards/${boardId}/columns/${columnId}/tasks`, body, options);
  }

  editTask({
    userId, boardId, columnId, taskId, order, title, description
  }: ITaskProps): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };

    return this.http.put(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, body, options);
  }

  editMovedTask({
    userId, boardId, previousColumnId, columnId, taskId, order, title, description
  }: ITaskProps): Observable<object> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };

    return this.http.put(`/api/boards/${boardId}/columns/${previousColumnId}/tasks/${taskId}`, body, options);
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<object> {
    return this.http.delete(`/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }
}
