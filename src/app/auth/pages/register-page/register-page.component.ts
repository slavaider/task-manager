import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  hide: boolean = true;

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  get name(): AbstractControl | null {
    return this.registerForm.get('name');
  }

  get login(): AbstractControl | null {
    return this.registerForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  submit() {
    const { name, login, password } = this.registerForm.value;
    if (name && login && password) {
      this.auth.register({ name, login, password }).subscribe((res) => console.log(res));
    }
  }
}
