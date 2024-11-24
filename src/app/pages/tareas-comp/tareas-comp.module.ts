import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasCompPageRoutingModule } from './tareas-comp-routing.module';

import { TareasCompPage } from './tareas-comp.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasCompPageRoutingModule,
    SharedModule,
  ],
  declarations: [TareasCompPage]
})
export class TareasCompPageModule {}
