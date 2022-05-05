import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { editUser } from 'src/app/store/actions/users.actions';
import { IUser } from 'src/app/store/models/user.model';
import { selectUser } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public user$ = this.iAppStateStore.select(selectUser);

  public user!: IUser | null;

  public hide: boolean = true;

  public editForm: FormGroup = this.fb.group({
    name: [this.user?.name, [Validators.required]],
    login: [this.user?.login, [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private iAppStateStore: Store<IAppState>,
    private fb: FormBuilder, private auth: AuthService,
    private notification: MatSnackBar,
    private router: Router,
    private store: Store) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => (this.user = user));
  }

  public get name(): AbstractControl | null {
    return this.editForm.get('name');
  }

  public get login(): AbstractControl | null {
    return this.editForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.editForm.get('password');
  }

  public submit() {
    const { name, login, password } = this.editForm.value;
    if (this.user && name && login) {
      this.auth.editUser( this.user.id, { name, login, password }).subscribe(() => {
        this.notification.open(`${name} зарегистрирован`, 'ok', {
          duration: 4000,
          panelClass: ['note-success'],
        });
        if (this.user !== null) {
          const modifiedUser: IUser = {id: this.user.id, name, login}
          this.store.dispatch(editUser({ modifiedUser }));
          this.router.navigateByUrl('/auth/login');
        }
      });
    }
  }
}
