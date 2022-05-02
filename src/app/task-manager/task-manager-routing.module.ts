import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'boards',
    component: BoardsPageComponent,
  },
  {
    path: 'boards/:id',
    component: BoardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
