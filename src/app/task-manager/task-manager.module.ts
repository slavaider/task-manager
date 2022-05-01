import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';

@NgModule({
  declarations: [MainComponent, BoardComponent, BoardListComponent],
  exports: [],
  schemas: [],
  imports: [CommonModule],
})
export class TaskManagerModule {}
