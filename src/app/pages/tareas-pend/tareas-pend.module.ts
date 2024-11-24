import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasPendPageRoutingModule } from './tareas-pend-routing.module';

import { TareasPendPage } from './tareas-pend.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasPendPageRoutingModule,
    SharedModule,
  ],
  declarations: [TareasPendPage]
})
export class TareasPendPageModule {}
