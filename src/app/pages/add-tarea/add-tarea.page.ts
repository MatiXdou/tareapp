import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Tareas } from 'src/app/models/Tareas.models';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.page.html',
  styleUrls: ['./add-tarea.page.scss'],
})
export class AddTareaPage implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  cargando: boolean = false;

  private alertController = inject(AlertController);

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit() { }

  async addTarea() {
    try {
      this.cargando = true;
      const nuevaTarea: Tareas = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: 'pendiente',
        userId: ''
      };

      await this.firestoreService.addTarea(nuevaTarea);
      this.cargando = false;
      await this.mostrarMensaje('Exito', 'Tarea añadida exitosamente.');
      this.router.navigate(['/tareas-pend']);
    } catch (error) {
      await this.mostrarMensaje('Error', 'Error al añadir la tarea.');
      this.cargando = false;
    }
  }

  async mostrarMensaje(cabecera: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: ['Entendido']
    });
    await alert.present();
  }

}
