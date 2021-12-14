import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';
import { Empresa } from '../_models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Empresa[]>( apiURL+`/users`);
  }

  register(empresa: Empresa) {
      return this.http.post(apiURL+`/api/Empresa/Sign_up_Empresa`, empresa);
  }

  delete(id: number) {
      return this.http.delete(apiURL+`/api/Empresa/Eliminar_Empresa/${id}`);
  }

}
