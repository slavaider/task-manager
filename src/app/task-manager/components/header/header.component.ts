import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    this.isSticky = window.pageYOffset >= 50;
  }

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.trackLogin$.subscribe((value) => {
      this.isLogged = value;
    });
  }

  public logout() {
    this.auth.logout();
  }
}
