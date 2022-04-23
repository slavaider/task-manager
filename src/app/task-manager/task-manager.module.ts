import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent],
  exports: [],
  schemas: [],
  imports: [CommonModule],
})
export class TaskManagerModule {}
