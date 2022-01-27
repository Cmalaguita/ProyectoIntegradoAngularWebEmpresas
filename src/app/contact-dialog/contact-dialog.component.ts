import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferService } from './../_services/offer.service';
import { EmpresaService } from './../_services/empresa.service';
import { Alumno } from './../_models/alumno';
import { PosicionDeTrabajo } from './../_models/posiciondetrabajo';
import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {
mensaje!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {p: PosicionDeTrabajo,a:Alumno|undefined},private offerService:OfferService,private snackbar:MatSnackBar) { }

enviarMensaje(emailDestino:string,nombrePosicion:string,nombreEmpresa:string|undefined,emailEmpresa:string){
if (emailDestino!=null&& nombrePosicion!=null && nombreEmpresa!=null&&emailEmpresa!=null) {

  this.offerService.contactarConCandidato(emailDestino,this.mensaje,nombrePosicion,nombreEmpresa!,emailEmpresa).subscribe((_)=>{
    this.snackbar.open('Mensaje enviado.', '', {
      duration: 5000,
    });
  },
  (error) => {
    this.snackbar.open('El mensaje no se ha enviado correctamente.', '', {
      duration: 5000,
    });
  }
  )
}

}

  ngOnInit() {
  }

}
