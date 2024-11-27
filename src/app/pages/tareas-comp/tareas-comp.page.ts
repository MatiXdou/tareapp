import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Tareas } from 'src/app/models/Tareas.models';

@Component({
  selector: 'app-tareas-comp',
  templateUrl: './tareas-comp.page.html',
  styleUrls: ['./tareas-comp.page.scss'],
})
export class TareasCompPage implements OnInit, OnDestroy {
  tareasCompletadas$: Observable<Tareas[]> | null = null;
  private userSubscription: Subscription | null = null;

  private alertController = inject(AlertController);

  constructor(private firestoreService: FirestoreService, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.tareasCompletadas$ = this.firestoreService.getTareasByEstado('completada', user.uid);
      } else {
        this.tareasCompletadas$ = null;
      }
    });
  }

  async ConfirmEliminarTarea(tareaId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.firestoreService.eliminarTarea(tareaId);
              await this.mostrarMensaje('Exito', 'Tarea eliminada exitosamente.');
            } catch (error) {
              await this.mostrarMensaje('Error', 'Error al eliminar la tarea.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async mostrarMensaje(cabecera: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: ['Entendido']
    });
    await alert.present();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
