import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './errors-handler/errors-handler';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MaterialModule } from '../material/material.module';
import { AppI18nextModule } from './../app-i18next.module';
@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MaterialModule, AppI18nextModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
  ],
})
export class CoreModule {}
