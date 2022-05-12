import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserPageComponent } from '../../pages/user-page/user-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isSticky: boolean = false;

  public isLogged: boolean = this.auth.isLogged();

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 1;
  }

  constructor(public auth: AuthService, public form: MatDialog, @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {}

  ngOnInit(): void {
    this.auth.trackLogin$.subscribe((value) => {
      this.isLogged = value;
    });
  }

  public logout() {
    this.auth.logout();
  }

  public editUser() {
    this.form.open(UserPageComponent);
  }

  public switchToggle(event: MatSlideToggleChange) {
    console.log(event.checked)
    // if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(event.checked ? 'en' : 'ru').then(x => {
        document.location.reload();
      });
    // }
  }
}
