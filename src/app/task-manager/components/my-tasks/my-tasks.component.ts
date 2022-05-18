import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { forkJoin, map, Subject } from 'rxjs';
import { BoardRequestService } from 'src/app/core/services/request/board-request.service';
import { ITask } from 'src/app/store/models/board.model';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  private tasks = new Subject<ITask[]>();
  public tasks$ = this.tasks.asObservable();

  constructor(
    private readonly store: Store<IAppState>,
    private request: BoardRequestService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) { }

  ngOnInit(): void {
    this.request.getBoards().pipe(
      map((boards) => boards.map(({ id }) => this.request.getBoard(id))), 
    ).subscribe((requests) => {
      forkJoin(requests).subscribe((response) => {
        let tasks: ITask[] = [];
        response
          .forEach((board) => {
            const columns = [];
            columns.push(...board.columns);
            columns.forEach((column) => tasks.push(...column.tasks));
          })
        tasks = tasks.filter((task) => task.userId === this.data.userId);
        
        this.tasks.next(tasks);
      })
    });
  }
}
