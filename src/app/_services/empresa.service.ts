import { Empresa } from './../_models/empresa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }
  login(empresa: Empresa): Observable<any> {
    return this.http.post(apiURL+`/Empresa/Login_Empresa`, empresa);
  }

  getAll() {
      return this.http.get<Empresa[]>( apiURL+`/Empresa/Obtener_Todas_Las_Empresas`);
  }

  register(empresa: Empresa): Observable<any> {
      return this.http.post(apiURL+`/Empresa/Sign_up_Empresa`, empresa);
  }

  delete(id: number) {
      return this.http.delete(apiURL+`/Empresa/Eliminar_Empresa/${id}`);
  }

}
