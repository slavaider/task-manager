import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { ITask } from 'src/app/store/models/board.model';
import { IUser } from 'src/app/store/models/user.model';
import { selectUsers } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { ChangeUserFormComponent } from '../change-user-form/change-user-form.component';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
  private users$ = this.store.select(selectUsers);
  public users!: IUser[];

  public owner!: string;

  @Input() public boardId!: string;
  @Input() public columnId!: string;
  @Input() public task!: ITask;

  constructor(
    private store: Store<IAppState>,
    public form: MatDialog,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) { }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.users = users;
      const user = users.find((user) => user.id === this.task.userId);
      this.owner = user ? user.login : this.i18NextService.t('words.withoutOwner')
    })
  }

  public changeUser() {
    this.form.open(ChangeUserFormComponent, {
      data: {
        users: this.users,
        owner: this.owner,
        boardId: this.boardId,
        columnId: this.columnId,
        task: this.task,
      }
    });
  }
}
