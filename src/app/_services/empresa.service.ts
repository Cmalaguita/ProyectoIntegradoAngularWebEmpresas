import { Router } from '@angular/router';
import { Empresa } from './../_models/empresa';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  constructor(private http: HttpClient,private router:Router) { }

  login(empresa: Empresa) {
    return this.http.post(apiURL+`/Empresa/Login_Empresa`, empresa,{observe: "response"});
  }

  getAll() {
      return this.http.get<Empresa[]>( apiURL+`/Empresa/Obtener_Todas_Las_Empresas`);
  }

  register(empresa: Empresa): Observable<any> {

      return this.http.post(apiURL+`/Empresa/Sign_up_Empresa`, empresa);
  }
}
