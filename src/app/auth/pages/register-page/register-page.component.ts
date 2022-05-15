import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public hide: boolean = true;

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: MatSnackBar,
    private router: Router,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) {}

  public get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  public get login(): AbstractControl | null {
    return this.registerForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public submit() {
    const { name, login, password } = this.registerForm.value;
    if (name && login && password) {
      this.auth.register({ name, login, password }).subscribe((response) => {
        const { name } = response;
        if (name) {
          this.notification.open(`${name} ${this.i18NextService.t('words.registered')}`, 'ok', {
          // this.notification.open(`${name} зарегистрирован`, 'ok', {
            duration: 4000,
            panelClass: ['note-success'],
          });

          this.router.navigateByUrl('/auth/login');
        } else {
          this.notification.open(this.i18NextService.t('words.oops'), 'ok', {
          // this.notification.open('Упс! Попробуйте еще раз.', 'ok', {
            duration: 4000,
            panelClass: ['note-error'],
          });
        }
      });
    }
  }
}
