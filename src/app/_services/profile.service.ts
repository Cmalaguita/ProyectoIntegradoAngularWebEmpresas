import { Empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getEmpresa(id:string): Observable<Empresa> {

    return this.http.get<Empresa>( apiURL+`/Empresa/Buscar_Empresa_Id?id=`+id);

  }
  updateProfile(empresa:Empresa) {
    return this.http.post(apiURL+'/Empresa/Actualizar_Empresa',empresa);
  }
}
