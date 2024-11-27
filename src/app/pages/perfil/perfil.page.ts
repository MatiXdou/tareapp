import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { User } from 'src/app/models/User.models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: User | null = null;

  private alertController = inject(AlertController);

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }


  async loadUserData() {
    try {
      const data = await this.firestoreService.getUserData();
      if (data) {
        this.userData = data as User;
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }


  async resetPassword() {
    try {
      if (this.userData) {
        const message = await this.authService.resetPassword(this.userData.email);
        await this.mostrarMensaje('Exito', message);
      }
    } catch (error) {
      await this.mostrarMensaje('Error', 'Error al restablecer la contraseña.');
    }
  }

  async borrarCuenta() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              const message = await this.authService.deleteUserAccount();
              await this.mostrarMensaje('Exito', message);
              this.router.navigate(['/inicio']);
            } catch (error) {
              await this.mostrarMensaje('Error', 'Error al eliminar la cuenta.');
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

}
