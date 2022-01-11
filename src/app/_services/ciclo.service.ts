import { Tipociclo } from './../_models/tipociclo';
import { Familia } from './../_models/familia';
import { Ciclo } from './../_models/ciclo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CicloService {

constructor(private http: HttpClient) { }

getAll() {
  return this.http.get<Ciclo[]>( apiURL+`/Ciclo/Obtener_Todos_Los_Ciclos`);
}

getAllFamilias(){

  return this.http.get<Familia[]>( apiURL+`/FamiliaProfesional/Obtener_Todas_Las_Familias_Profesionales`);
}

getAllTipos(){

  return this.http.get<Tipociclo[]>( apiURL+`/TipoDeCiclo/Obtener_Todos_Los_Tipos_De_Ciclo`);
}


getCiclosByTipo(id:number){
  return this.http.get<Ciclo[]>( apiURL+`/Ciclo/Obtener_Ciclos_Por_Tipo?idTipo=`+id);
}
getCiclosByFamilia(id:number){
  return this.http.get<Ciclo[]>( apiURL+`/Ciclo/Obtener_Ciclos_Por_Familia?idFamilia=`+id);
}
getCiclosByFamiliaAndTipo(idTipo:string, idFamilia:string){
  return this.http.get<Ciclo[]>( apiURL+`/Ciclo/Obtener_Ciclos_Por_Familia_Y_Tipo?idTipo=`+idTipo+`&idFamilia=`+idFamilia);
}
}
