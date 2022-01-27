import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  empresa!: Empresa;
  error: boolean = false;
  code: boolean = true;
  logincode: boolean = false;
  recopass: boolean = true;
  emailVerificar!: string;
  verificationCode!: string;
  codepass: boolean = true;
  passCode!: string;
  emailRecoPass!: string;
  recomail: boolean = true;
  inputRepeatRecoPassword!: string;
  inputRecoPass!: string;
  constructor(
    private empresaService: EmpresaService,
    private route: Router,
    private snackbar: MatSnackBar
  ) {
    this.empresa = {
      email: '',
      password: '',
    };
  }
  genCodePass() {
    if (this.emailRecoPass != null) {
      this.recomail = true;
      this.empresaService.generarCodigo(this.emailRecoPass).subscribe();
      this.codepass = false;
    } else {
      this.snackbar.open('Debes introducir un email para continuar.', '', {
        duration: 5000,
      });
    }
  }

  emailCodePass() {
    this.recomail = false;
    this.logincode = true;
  }

  recoPassword() {
    this.recopass = false;
    this.logincode = true;
  }
  backRecoPassword() {
    this.recopass = true;
    this.logincode = false;
  }
  login() {
    const empresa = {
      email: this.empresa.email,
      password: this.empresa.password,
    };

    this.empresaService.login(empresa).subscribe(
      (data) => {
        sessionStorage.setItem('id', data.body!.toString());
        sessionStorage.setItem(
          'authorization',
          data.headers.get('authorization')!
        );
        console.log(data);

        this.empresaService.empresaPorId().subscribe((response) => {
          if (response.emailVerificado) {
            this.route.navigate(['/navigation']);
          } else {
            this.emailVerificar = response.email;
            this.code = false;
            this.logincode = true;
            this.empresaService.generarCodigo(response.email).subscribe();
          }
        });
      },
      (error) => {
        this.error = true;
      }
    );
  }
  checkCodigo() {
    this.empresaService
      .comprobarCodigoEmail(this.verificationCode, this.emailVerificar)
      .subscribe((data) => {
        if (data) {
          window.location.reload();
          this.snackbar.open('Email verificado satisfactoriamente', '', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('El código introducido no es correcto.', '', {
            duration: 5000,
          });
        }
      });
  }

  checkCodigoPass() {
    this.empresaService
      .comprobarCodigoPass(this.emailRecoPass, this.passCode)
      .subscribe(
        (data) => {
          this.codepass = true;
          this.recopass = false;
        },
        (error) => {
          this.snackbar.open('El código introducido no es correcto.', '', {
            duration: 5000,
          });
        }
      );
  }

  cambiarPass() {
    if (
      this.inputRecoPass != null &&
      this.inputRepeatRecoPassword != null &&
      this.inputRecoPass == this.inputRepeatRecoPassword
    ) {
      this.empresaService
        .cambiarPass(this.inputRecoPass, this.emailRecoPass)
        .subscribe(
          (data) => {
            this.codepass = true;
            this.recopass = true;
            this.logincode = false;
            this.snackbar.open('Contraseña cambiada correctamente.', '', {
              duration: 5000,
            });
          },
          (error) => {
            this.snackbar.open('Algo ha salido mal, intentalo de nuevo.', '', {
              duration: 5000,
            });
          }
        );
    }
  }

  ngOnInit() {}
}
