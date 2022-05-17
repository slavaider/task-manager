import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/store/models/user.model';
import { selectUser } from 'src/app/store/selectors/users.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { UserPageComponent } from '../../pages/user-page/user-page.component';
import { MyTasksComponent } from '../my-tasks/my-tasks.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private user$ = this.store.select(selectUser);
  public user!: IUser;

  public isSticky: boolean = false;

  public isLogged: boolean = this.auth.isLogged();

  public isChecked = this.i18NextService.language === 'en';

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 1;
  }

  constructor(
    private store: Store<IAppState>,
    public auth: AuthService,
    public form: MatDialog,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) {}

  ngOnInit(): void {
    this.auth.trackLogin$.subscribe((value) => {
      this.isLogged = value;
    });

    this.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  public logout() {
    this.auth.logout();
  }

  public editUser() {
    this.form.open(UserPageComponent);
  }

  public switchToggle(event: MatSlideToggleChange) {
    this.i18NextService.changeLanguage(event.checked ? 'en' : 'ru').then(x => {
      document.location.reload();
    });
  }

  public showTasks() {
    this.form.open(MyTasksComponent, {
      data: {
        userId: this.user.id
      }
    });
  }
}
