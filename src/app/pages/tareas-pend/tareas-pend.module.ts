import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasPendPageRoutingModule } from './tareas-pend-routing.module';

import { TareasPendPage } from './tareas-pend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasPendPageRoutingModule
  ],
  declarations: [TareasPendPage]
})
export class TareasPendPageModule {}
