import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/store/models/user.model';
import { selectUsers } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent implements OnInit {
  private users$ = this.store.select(selectUsers);
  public users!: IUser[];

  public login: string | undefined;

  @Input() public id!: string;


  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.login = users.find((user) => user.id === this.id)?.login;
    })
  }

}
