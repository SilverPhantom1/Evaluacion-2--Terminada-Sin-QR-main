import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    usuario : string = "";
    contrasena : string = "";
  
    constructor(private apiRestService: ApiRestService, private router: Router, private toastController: ToastController) {}

    async ingresar() {
      this.apiRestService.validarCredencialesDocente(this.usuario, this.contrasena).subscribe(credencialesValidas => {
        if (credencialesValidas) {
          this.redirigirALaPaginaInicioConSaludo();
        } else {
          this.mostrarMensajeError();
        }
      });
    }
  
    async mostrarMensajeError() {
      const toast = await this.toastController.create({
        message: 'Usuario o contraseña incorrectas.',
        duration: 2000,
        position: 'middle',
        color: 'danger'
      });
      toast.present();
    }
  
    async redirigirALaPaginaInicioConSaludo() {
      

      const toast = await this.toastController.create({
        message: `Bienvenido ${this.usuario}`,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
      
      this.router.navigate(['/inicio']);
    }
  }