import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { TaskManagerComponent } from './task-manager.component';
import { TaskRoutingModule } from './task-manager-routing.module';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    MainComponent,
    BoardComponent,
    BoardListComponent,
    BoardPageComponent,
    BoardsPageComponent,
    TaskManagerComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [],
  schemas: [],
  imports: [CommonModule, TaskRoutingModule, MaterialModule],
})
export class TaskManagerModule {}
