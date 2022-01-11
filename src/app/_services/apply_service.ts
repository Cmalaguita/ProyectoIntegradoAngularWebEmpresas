import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiURL } from "src/environments/environment";
import { Inscripcion } from "../_models/inscripcion";



@Injectable({
  providedIn: 'root'
})
export class ApplyService {

constructor(private http: HttpClient) { }
updateApply(inscripcion:Inscripcion) {
  return this.http.post(apiURL+`/Inscripcion/Actualizar_Inscripcion`,inscripcion);
}

getAppliesByOffer(idPosicion: string) {
  return this.http.get<Inscripcion[]>(apiURL+`/Inscripcion/Obtener_Alumnos_Inscritos_Por_Posicion?idPosicion=`+idPosicion);
}

}
