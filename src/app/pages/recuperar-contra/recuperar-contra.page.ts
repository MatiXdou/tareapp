import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {
  email: string = '';
  cargando: boolean = false;

  private alertController = inject(AlertController);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() { }

  async recoverPassword() {
    this.cargando = true;
    try {
      await this.authService.resetPassword(this.email);
      await this.mostrarMensaje('Exito', 'Se ha enviado el correo de recuperacion.');
      this.router.navigate(['/inicio']);
    } catch (error) {
      await this.mostrarMensaje('Error', 'Error al enviar el correo de recuperación.');
    } finally {
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
