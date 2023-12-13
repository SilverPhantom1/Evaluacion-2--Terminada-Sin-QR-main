import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Alumnos } from '../interfaces/listas';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  alumnos: Alumnos[] = [];
  codigoQRGenerado: boolean = false;
  asignaturaSeleccionada: string = '';
  codigoQRProgramacion: string = '';
  codigoQRGestion: string = '';

  constructor(private api: ApiRestService, private loadingCtrl: LoadingController) {}

  ionViewWillEnter() {
    this.loadAlumnos();
  }

  async loadAlumnos(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.api.listarAlumnos().subscribe(
      (resp) => {
        loading.dismiss();
        let listString = JSON.stringify(resp);
        this.alumnos = JSON.parse(listString);
        event?.target.complete();
      },
      (err) => {
        console.log(err.message);
        loading.dismiss();
      }
    );
  }

  generarQR(asignatura: string) {
    this.asignaturaSeleccionada = asignatura;
    if (asignatura === 'Programacion') {
      this.codigoQRProgramacion = 'Contenido para Programación de Aplicaciones Móviles';
      this.codigoQRGestion = '';
    } else if (asignatura === 'Gestion') {
      this.codigoQRGestion = 'Contenido para Gestión de Personas';
      this.codigoQRProgramacion = '';
    }

    this.codigoQRGenerado = true;
  }
}

