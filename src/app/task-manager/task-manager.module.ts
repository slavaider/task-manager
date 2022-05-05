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
import { CreateBoardFormComponent } from './components/create-board-form/create-board-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateColumnFormComponent } from './components/create-column-form/create-column-form.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

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
    CreateBoardFormComponent,
    CreateColumnFormComponent,
    CreateTaskFormComponent,
    UserPageComponent,
  ],
  exports: [],
  schemas: [],
  imports: [CommonModule, TaskRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class TaskManagerModule {}
