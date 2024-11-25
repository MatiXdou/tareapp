import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string = '';
  password: string = '';
  cargando: boolean = false;
  error: string = '';

  private alertController = inject(AlertController);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  async login() {
    this.cargando = true;
    try {
      const userCredential = await this.authService.login(this.email, this.password);
      await this.mostrarMensaje('Exito', 'Inicio de sesion exitoso.');
      this.router.navigate(['/tareas-pend']);
    } catch (error) {
      this.error = this.authService.GenError(error);
      await this.mostrarMensaje('Error', this.error);
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
