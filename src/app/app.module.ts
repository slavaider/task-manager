import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppI18nextModule } from './app-i18next.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { interceptors } from './http-interceptors/interceptors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from './core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { TaskManagerModule } from './task-manager/task-manager.module';
import { reducers } from './store/reducers/reducers';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/effects/boards.effects';
import { MaterialModule } from './material/material.module';
import { WelcomePageComponent } from './task-manager/pages/welcome-page/welcome-page.component';

@NgModule({
  declarations: [AppComponent, WelcomePageComponent],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    TaskManagerModule,
    AppRoutingModule,
    AppI18nextModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BoardsEffects]),
    MaterialModule,
  ],
  providers: [interceptors, CookieService],
  bootstrap: [AppComponent],
  exports: [FormsModule],
})
export class AppModule {}
