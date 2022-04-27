import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private readonly fb: FormBuilder,
    private auth: AuthService,
    private notification: MatSnackBar,
    private router: Router,
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
        // console.log(res.token);
      });
    }
  }
}
