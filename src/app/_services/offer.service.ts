import { PosicionDeTrabajo } from '../_models/posiciondetrabajo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OfferService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<PosicionDeTrabajo[]>(
      apiURL + `/PosicionDeTrabajo/Obtener_Todas_Las_Posiciones_De_Trabajo`
    );
  }
  createOffer(posicion: PosicionDeTrabajo) {
    return this.http.post(
      apiURL + `/PosicionDeTrabajo/Crear_Posicion_De_Trabajo`,
      posicion
    );
  }

  getOffersByEmpresaId(id: string) {
    return this.http.get<PosicionDeTrabajo[]>(
      apiURL +
        `/PosicionDeTrabajo/Obtener_Posiciones_De_Trabajo_Por_Empresa?id=` +
        id
    );
  }

  delete(id: string) {
    console.log(id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: Number(id),
      },


    };
    return this.http.delete(
      apiURL + `/PosicionDeTrabajo/Eliminar_Posicion_De_Trabajo`, options
    );
  }

  getOfferById(id: string) {
    return this.http.get<PosicionDeTrabajo>(
      apiURL + `/PosicionDeTrabajo/Obtener_Posicion_De_Trabajo_Por_Id?id=` + id
    );
  }
  contactarConCandidato(
    emailDestino: string,
    mensaje: string,
    nombrePosicion: string,
    nombreEmpresa: string,
    emailEmpresa: string
  ) {
    const headers = new HttpHeaders({
      accept: 'text/plain',
      'Content-Type': 'application/json',
    });
    return this.http.post(
      apiURL +
        '/Empresa/Contactar_Con_Candidato?emailDestino=' +
        emailDestino +
        '&mensaje=' +
        mensaje +
        '&nombrePosicion=' +
        nombrePosicion +
        '&nombreEmpresa=' +
        nombreEmpresa +
        '&emailEmpresa=' +
        emailEmpresa,
      { headers: headers }
    );
  }
}
