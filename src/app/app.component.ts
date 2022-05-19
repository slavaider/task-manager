import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { loadUsers } from './store/actions/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  constructor(
    private store: Store,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    const login = this.cookieService.get('login');
    if (login) {
      this.store.dispatch(loadUsers({ login }));
    }
  }
}
