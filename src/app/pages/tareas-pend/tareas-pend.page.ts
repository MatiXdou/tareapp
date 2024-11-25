import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Tareas } from 'src/app/models/Tareas.models';

@Component({
  selector: 'app-tareas-pend',
  templateUrl: './tareas-pend.page.html',
  styleUrls: ['./tareas-pend.page.scss'],
})
export class TareasPendPage implements OnInit {
  tareasPendientes: Tareas[] = [];

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    try {
      this.tareasPendientes = await this.firestoreService.getTareas();
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  }

}
