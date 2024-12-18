import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  cargando: boolean = false;
  error: string = '';

  private alertController = inject(AlertController);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async register() {
    this.cargando = true;
    try {
      await this.authService.register(this.fullName, this.email, this.password);
      await this.mostrarMensaje('Exito', 'Usuario registrado exitosamente.');
      this.router.navigate(['/tareas-pend']);
    } catch (error) {
      this.error = this.authService.GenError(error);
      await this.mostrarMensaje('Exito', this.error);
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
