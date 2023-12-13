import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service'; 
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {

  usuario: string = ''; 

  constructor(
    private apiRestService: ApiRestService,
    private router: Router,
    private toastController: ToastController 
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle',
      color: 'danger'
    });
    toast.present();
  }

  recuperarContrasena() {
    if (this.usuario) {
      this.apiRestService.getNombreDocentePorUsuario(this.usuario).subscribe((nombreDocente: string) => {
        if (nombreDocente) {
          this.router.navigate(['/home']);
        } else {
          this.presentToast('Usuario no encontrado.');
        }
      });
    } else {
      this.presentToast('Por favor, ingresa un nombre de usuario');
    }
  }
}