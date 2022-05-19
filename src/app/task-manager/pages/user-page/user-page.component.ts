import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
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
    private dialogService: DialogService,
    private auth: AuthService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<UserPageComponent>,
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
    this.dialogService
      .confirm({
        message: this.i18NextService.t('questionsDelete.user'),
      })
      .subscribe((answer) => {
        if (answer && this.user) {
          const id = this.user.id;
          this.userService.deleteUser(id).subscribe(() => {
            this.notification.open(this.i18NextService.t('words.userRemoved'), 'ok', {
              duration: 4000,
              panelClass: ['note-success'],
            });

            this.dialogRef.close();

            this.router.navigateByUrl('/auth/login');

            this.store.dispatch(deleteUser({ id }));
            
            this.cookieService.delete('token', '/');
            this.cookieService.delete('login', '/');

            this.auth.updateTrackLogin(false);
          });
        }
      })
  }

  public submit() {
    const { name, login, password } = this.editForm.value;
    if (this.user && name && login) {
      this.userService.editUser( this.user.id, { name, login, password }).subscribe(() => {
        this.notification.open(`${name} ${this.i18NextService.t('words.changesSaved')}`, 'ok', {
          duration: 4000,
          panelClass: ['note-success'],
        });
        if (this.user) {
          const modifiedUser: IUser = {id: this.user.id, name, login}
          this.store.dispatch(editUser({ modifiedUser }));
          this.router.navigateByUrl('/auth/login');

          this.cookieService.delete('token', '/');
          this.cookieService.delete('login', '/');

          this.auth.updateTrackLogin(false);
        }
      });
    }
  }
}
