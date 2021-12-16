import { PosicionDeTrabajo } from './../_models/posiciondetrabajo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';
import { Empresa } from '../_models/empresa';

@Injectable({
  providedIn: 'root'
})
export class PosicionService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<PosicionDeTrabajo[]>( apiURL+`/Empresa/Obtener_Todas_Las_Empresas`);
  }

  register(empresa: Empresa): Observable<any> {

      return this.http.post(apiURL+`/Empresa/Sign_up_Empresa`, empresa);
  }

  delete(id: number) {
      return this.http.delete(apiURL+`/Empresa/Eliminar_Empresa/${id}`);
  }

}
