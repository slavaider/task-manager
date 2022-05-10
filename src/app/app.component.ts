import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const login = this.cookieService.get('login');
    if (login) {
      this.store.dispatch(loadUsers({ login }));
    } 
  }

  public test() {
    this.http.get('/api/boards').subscribe((res) => console.log(res));
  }
}
