import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide: boolean = true;

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  get login(): AbstractControl | null {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  submit() {
    const { login, password } = this.loginForm.value;
    if (login && password) {
      // this.auth.logIn({ login, password });
      console.log(login, password);
    }
  }
}
