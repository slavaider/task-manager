import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public hide: boolean = true;

  public loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  public get login(): AbstractControl | null {
    return this.loginForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  public submit() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      this.auth.login({ login, password }).subscribe((res) => {
        console.log(res);
        const token = res.token;
        const expDate = new Date(Date.now() + 60 * 60 * 12 * 1000); // 12 hours
        const path = '/';
        this.cookieService.set('token', token, expDate, path);

        this.auth.updateTrackLogin(true);

        this.router.navigateByUrl(path);
      });
    }
  }
}
