import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TaskManagerModule } from '../task-manager/task-manager.module';
import { AppI18nextModule } from './../app-i18next.module';

@NgModule({
  declarations: [AuthComponent, LoginPageComponent, RegisterPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    TaskManagerModule,
    AppI18nextModule
  ],
})
export class AuthModule {}
