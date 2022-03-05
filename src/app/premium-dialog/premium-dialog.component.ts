import { Empresa } from './../_models/empresa';
import { EmpresaService } from './../_services/empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-dialog',
  templateUrl: './premium-dialog.component.html',
  styleUrls: ['./premium-dialog.component.css']
})
export class PremiumDialogComponent implements OnInit {
  empresa!:Empresa;
  constructor(private empresaService:EmpresaService) {
    this.empresa = {
      email: '',
      password: '',
    };
   }
  suscripcionDesdeDialog(){
    this.empresaService.empresaPorId().subscribe((e)=>{
      if (e !=null ) {
        this.empresa.id=e.id;
        this.empresa.direccion=e.direccion;
        this.empresa.email=e.email;
        this.empresa.password=e.password;
        this.empresa.empresaStripeID=e.empresaStripeID;
        this.empresa.provincia=e.provincia;
        this.empresa.provinciaid=e.provinciaid;
        this.empresa.nombre=e.nombre;
        this.empresa.localidad=e.localidad;
        this.empresa.emailVerificado=e.emailVerificado;
        this.empresa.codigoverificacion=e.codigoverificacion;
        this.empresaService.crearSuscripcionPremium(this.empresa).subscribe((response)=>{
          window.location.href=response;
        })
      }
    })
    }
  ngOnInit() {

  }

}
