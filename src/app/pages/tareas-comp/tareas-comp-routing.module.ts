import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasCompPage } from './tareas-comp.page';

const routes: Routes = [
  {
    path: '',
    component: TareasCompPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasCompPageRoutingModule {}
