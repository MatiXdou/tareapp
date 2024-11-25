import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  cargando: boolean = false;

  private alertController = inject(AlertController);

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() { }

  async onGoogleLogin() {
    try {
      this.cargando = true;
      const user = await this.authService.loginWithGoogle();
      this.cargando = false;
      await this.mostrarMensaje('Exito', 'Inicio de sesion exitoso.');
      this.router.navigate(['/tareas-pend']);
    } catch (error) {
      await this.mostrarMensaje('Error', 'Error al iniciar sesión con Google.');
      this.cargando = false;
    }
  }

  async onGuestLogin() {
    try {
      this.cargando = true;
      await this.authService.loginAsGuest();
      this.cargando = false;
      await this.mostrarMensaje('Exito', 'Inicio de sesión como invitado exitoso.');
      this.router.navigate(['/tareas-pend']);
    } catch (error) {
      await this.mostrarMensaje('Error', 'Error al iniciar sesión como invitado.');
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
