import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alumnos, Docentes } from './interfaces/listas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private urlDocentes = 'https://my-json-server.typicode.com/SilverPhantom1/json-server/docentes';
  private urlBase : string = 'https://my-json-server.typicode.com/SilverPhantom1/json-server';

  constructor(private httpClient: HttpClient) {}

  listarAlumnos():Observable<Alumnos[]>{
    return this.httpClient.get<Alumnos[]>(`${this.urlBase}/alumnos`)
  }

  getAlumnoByID(id:Number):Observable<Alumnos>{
    return this.httpClient.get<Alumnos>(`${this.urlBase}/alumnos/?id=${id}`)
  }

  validarCredencialesDocente(usuario: string, contrasena: string): Observable<boolean> {
    return this.httpClient.get<Docentes[]>(this.urlDocentes).pipe(map((data ) => {
      console.log(data)
      const docenteEncontrado = data.find((docente) => {
        return docente.usuario === usuario && docente.contrasena === contrasena;
      });
      return !!docenteEncontrado;
      
    }));
  }
  
  getNombreDocentePorUsuario(usuario: string): Observable<string> {
    return this.httpClient.get<Docentes[]>(this.urlDocentes).pipe(map((data) => {
        const docenteEncontrado = data.find((docente) => docente.usuario === usuario);
        return docenteEncontrado ? docenteEncontrado.nombre : ''; 
      })
    );
  }
}


