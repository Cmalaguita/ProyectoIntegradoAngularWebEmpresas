import { EmpresaService } from './../_services/empresa.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from '../_models/alumno';
import { Empresa } from '../_models/empresa';
import { Mensaje } from '../_models/mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-premium-dialog',
  templateUrl: './contact-premium-dialog.component.html',
  styleUrls: ['./contact-premium-dialog.component.css'],
})
export class ContactPremiumDialogComponent implements OnInit {
  mensaje!:Mensaje;
  msg!:string;
  empresa!:Empresa;
  startmsg!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { a: Alumno | undefined },
    private empresaService:EmpresaService,
    private snackbar: MatSnackBar
    ) {
this.mensaje={
  contenido:'',
  alumnoId:0,
  empresaId:0,
  leido:false

}

    }


    enviarMensajePremium() {

        this.empresaService.empresaPorId().subscribe((e)=>{
        this.empresa=e;
        this.startmsg="La empresa "+this.empresa.nombre+" se ha interesado en su perfil y le envia el siguiente mensaje: "

        this.startmsg+=this.msg;
        this.mensaje.contenido=this.startmsg;
        this.mensaje.alumnoId=this.data.a?.id!;

        this.mensaje.empresaId=this.empresa.id!;

        this.empresaService.mensajePremium(this.mensaje).subscribe(
            (_) => {
              this.snackbar.open('Mensaje enviado.', '', {
                duration: 5000,
              });
            },
            (error) => {
              this.snackbar.open(
                'El mensaje no se ha enviado correctamente.',
                '',
                {
                  duration: 5000,
                }
              );
            }
          );
    })


  }

  ngOnInit() {}
}
