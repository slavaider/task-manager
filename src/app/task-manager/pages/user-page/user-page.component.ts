/* eslint-disable ngrx/no-typed-global-store */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/store/models/user.model';
import { selectUser } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public user$ = this.store.select(selectUser);

  public user!: IUser | null;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => (this.user = user));
  }
}
