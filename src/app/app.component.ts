import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
      }),
    };
    this.http.get('/boards', options).subscribe((res) => console.log(res));
  }
}
