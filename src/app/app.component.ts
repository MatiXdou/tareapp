import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './firebase/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isGuest: boolean = false;
  isAuthenticated: boolean = false;

  private alertController = inject(AlertController);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.isGuest = user?.isAnonymous || false;
      this.isAuthenticated = !!user;
    });
  }

  async onLogout() {
    try {
      await this.authService.logout();
      await this.mostrarMensaje('Exito', 'Sesión cerrada exitosamente.');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async borrarCuenta() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión? Esta acción ELIMINARA tu cuenta y tus tareas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: async () => {
            try {
              await this.authService.deleteUserAccount();
              await this.mostrarMensaje('Exito', 'Sesión cerrada correctamente.');
              this.router.navigate(['/inicio']);
            } catch (error) {
              await this.mostrarMensaje('Error', 'Error al cerrar seisón.');
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
