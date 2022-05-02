import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

const routes: Routes = [
  {
    path: '',
    component: TaskManagerComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
