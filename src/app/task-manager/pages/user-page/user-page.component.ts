import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRequestService } from 'src/app/core/services/request/user-request.service';
import { editUser, deleteUser } from 'src/app/store/actions/users.actions';
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
    name: ['', [Validators.required]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private iAppStateStore: Store<IAppState>,
    private fb: FormBuilder,
    private userService: UserRequestService,
    private notification: MatSnackBar,
    private router: Router,
    private store: Store,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
      this.editForm = this.fb.group({
        name: [user?.name, [Validators.required]],
        login: [user?.login, [Validators.required]],
        password: ['', [Validators.required]],
      });
    });
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

  public deleteUser() {
    if (this.user) {
      const id = this.user.id;
      this.userService.deleteUser(id).subscribe(() => {
        this.notification.open(this.i18NextService.t('words.userRemoved'), 'ok', {
        // this.notification.open(`пользователь удален`, 'ok', {
          duration: 4000,
          panelClass: ['note-success'],
        });
        this.store.dispatch(deleteUser({ id }));
        this.router.navigateByUrl('/auth/login');
      });
    }
  }

  public submit() {
    const { name, login, password } = this.editForm.value;
    if (this.user && name && login) {
      this.userService.editUser( this.user.id, { name, login, password }).subscribe(() => {
        this.notification.open(`${name} ${this.i18NextService.t('words.changesSaved')}`, 'ok', {
        // this.notification.open(`${name} изменения сохранены`, 'ok', {
          duration: 4000,
          panelClass: ['note-success'],
        });
        if (this.user) {
          const modifiedUser: IUser = {id: this.user.id, name, login}
          this.store.dispatch(editUser({ modifiedUser }));
          this.router.navigateByUrl('/auth/login');
        }
      });
    }
  }
}
