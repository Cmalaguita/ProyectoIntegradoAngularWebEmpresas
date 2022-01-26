import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  empresa! :Empresa;
  error:boolean=false;
  code:boolean=true;
  logincode:boolean=false;
  emailVerificar!:string;
  verificationCode!:string;
  constructor(private empresaService:EmpresaService,private route:Router, private snackbar:MatSnackBar) {
    this.empresa={
      email:"",
      password:""
    };


  }


  login()  {
    const empresa = {email: this.empresa.email, password: this.empresa.password};

    this.empresaService.login(empresa).subscribe( (data) => {
    sessionStorage.setItem('id',data.body!.toString())
    sessionStorage.setItem('authorization',data.headers.get('authorization')!)
      console.log(data);


      this.empresaService.empresaPorId().subscribe((response) => {
        if (response.emailVerificado) {
          this.route.navigate(['/navigation']);
        } else{
          this.emailVerificar=response.email;
this.code=false;
this.logincode=true;
this.empresaService.generarCodigo(response.email).subscribe();

        }
      });
    },error=>{
this.error=true;

    });
  }
  checkCodigo(){

   this.empresaService.comprobarCodigoEmail(this.verificationCode,this.emailVerificar).subscribe((data)=>{
     if (data) {
   window.location.reload();
      this.snackbar.open("Email verificado satisfactoriamente","",{duration:5000});
     }else{
     this.snackbar.open("El código introducido no es correcto.","",{duration:5000});
     }
   });

      }

  ngOnInit() {
  }

}
