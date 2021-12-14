
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provincia } from '../_models/provincia';
import { apiURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

constructor(private http: HttpClient) { }

getAll():Observable<Provincia[]>{
  return this.http.get<Provincia[]>( apiURL+"/api/Provincia/Obtener_Todas_Las_Provincias");
}

}
