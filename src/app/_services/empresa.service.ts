import { Mensaje } from './../_models/mensaje';
import { Router } from '@angular/router';
import { Empresa } from './../_models/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient, private router: Router) {}

  login(empresa: Empresa) {
    return this.http.post(apiURL + `/Empresa/Login_Empresa`, empresa, {
      observe: 'response',
    });
  }

  getAll() {
    return this.http.get<Empresa[]>(
      apiURL + `/Empresa/Obtener_Todas_Las_Empresas`
    );
  }

  register(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(apiURL + `/Empresa/Sign_up_Empresa`, empresa);
  }

  updateProfile(empresa: Empresa): Observable<any> {
    return this.http.put(apiURL + `/Empresa/Actualizar_Empresa`, empresa);
  }

  empresaPorId(): Observable<Empresa> {
    return this.http.get<Empresa>(apiURL + `/Empresa/Buscar_Empresa_Id`);
  }
  generarCodigo(email: string) {
    const headers = new HttpHeaders({
      accept: 'text/plain',
      'Content-Type': 'application/json',
    });
    return this.http.post(
      apiURL + '/Empresa/Generar_Codigo_Verificacion?email=' + email,
      { headers: headers }
    );
  }
  comprobarCodigoEmail(codigo: string, email: string): Observable<boolean> {
    return this.http.get<boolean>(
      apiURL +
        `/Empresa/Comprobar_Codigo_Verificacion_Email?codigo=` +
        codigo +
        `&email=` +
        email
    );
  }
  comprobarCodigoPass(email: string, codigo: string): Observable<any> {
    return this.http.get<any>(
      apiURL +
        `/Empresa/Comprobar_Codigo_Verificacion?email=` +
        email +
        `&codigo=` +
        codigo
    );
  }
  cambiarPass(pass: string, email: string): Observable<any> {
    return this.http.get<any>(
      apiURL +
        `/Empresa/Cambiar_Password_Empresa?pass=` +
        pass +
        `&email=` +
        email
    );
  }

  crearSuscripcionPremium(empresa: Empresa) {

    return this.http.post(
      apiURL + '/Contrato/Crear_Sus_Premium' , empresa,
      {responseType: 'text'}
    );
  }
  comprobarPremium( empresaId: string): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'text/plain',
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      apiURL +
        `/Contrato/Comprobar_Sus_Premium?empresaId=`+empresaId,
        { headers: headers }
    );
  }
  mensajePremium( mensaje: Mensaje): Observable<Mensaje> {
    const headers = new HttpHeaders({
      accept: 'text/plain',
      'Content-Type': 'application/json',
    });
    return this.http.post<Mensaje>(
      apiURL +
        `/Mensaje/Crear_Mensaje`,mensaje,
        { headers: headers }
    );
  }
}
