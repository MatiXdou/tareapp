import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasCompPageRoutingModule } from './tareas-comp-routing.module';

import { TareasCompPage } from './tareas-comp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasCompPageRoutingModule
  ],
  declarations: [TareasCompPage]
})
export class TareasCompPageModule {}
