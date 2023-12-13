import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datos-persona',
  templateUrl: './datos-persona.page.html',
  styleUrls: ['./datos-persona.page.scss'],
})
export class DatosPersonaPage {

  alumno = {
    id: 0,
    nombre: "n alumno",
    usuario: "usuario del alumno",
    apellido: "a alumno",
    seccion: "a seccion",
    asignaturas: "a asignaturas"
  }

  constructor(private api: ApiRestService, private router: Router) { }

  ionViewWillEnter(){
    this.getAlumnoByID(this.getIdFromURL())
  }

  getIdFromURL(){
    let url = this.router.url
    let arr = url.split("/", 3)
    let id = parseInt(arr[2])
    return id
  }

  getAlumnoByID(alumnoID:Number){
    this.api.getAlumnoByID(alumnoID).subscribe(
      (resp:any) => {
        this.alumno = {
          id: resp[0].id,
          nombre: resp[0].nombre,
          usuario: resp[0].usuario,
          apellido: resp[0].apellido,
          seccion: resp[0].seccion,
          asignaturas: resp[0].asignaturas
        }
      }
    )
  }
}

