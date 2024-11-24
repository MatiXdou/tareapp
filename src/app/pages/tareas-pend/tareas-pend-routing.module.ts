import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasPendPage } from './tareas-pend.page';

const routes: Routes = [
  {
    path: '',
    component: TareasPendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasPendPageRoutingModule {}
