import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';
import { Alumno } from '../_models/alumno';
import { Inscripcion } from '../_models/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  constructor(private http: HttpClient) {}
  updateApply(inscripcion: Inscripcion) {
    return this.http.put(
      apiURL + `/Inscripcion/Actualizar_Inscripcion`,
      inscripcion
    );
  }

  getStudentApplyByOffer(idPosicion: string | undefined) {
    return this.http.get<Alumno[]>(
      apiURL +
        `/Inscripcion/Obtener_Alumnos_Inscritos_Por_Posicion?idPosicion=` +
        idPosicion
    );
  }
  getAppliesByOffer(idPosicion: string | undefined) {
    return this.http.get<Inscripcion[]>(
      apiURL +
        `/Inscripcion/Obtener_Inscripciones_Por_Posicion?idPosicion=` +
        idPosicion
    );
  }
}
