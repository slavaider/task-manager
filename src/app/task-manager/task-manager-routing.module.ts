import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
// import { MainComponent } from './pages/main/main.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TaskManagerComponent } from './task-manager.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
    children: [
      {
        path: '',
        component: BoardsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'boards/:id',
        component: BoardPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
        // component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
