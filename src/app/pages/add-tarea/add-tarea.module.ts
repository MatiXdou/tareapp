import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTareaPageRoutingModule } from './add-tarea-routing.module';

import { AddTareaPage } from './add-tarea.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTareaPageRoutingModule,
    SharedModule,
  ],
  declarations: [AddTareaPage]
})
export class AddTareaPageModule {}
