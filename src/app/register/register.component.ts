import { EmpresaService } from './../_services/empresa.service';
import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvinciaService } from '../_services/provincia.service';
import { Provincia } from '../_models/provincia';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  empresa!: Empresa;
  error: boolean = false;
  provinciaid: number = 0;
  registerForm: FormGroup = new FormGroup({
    nombre:new FormControl ('', [Validators.required,Validators.nullValidator]),
    email:new FormControl ('', [Validators.required,Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
  });

  listaProv: Provincia[] = [];
  constructor(
    private provinciaService: ProvinciaService,
    private empresaService: EmpresaService,
    private route: Router
  ) {
    this.empresa = {
      email: '',
      password: '',
      provinciaid: 0,
    };
  }

  changeselected(prov: Provincia) {
    console.log('CONSOLE LOG DE PROV ID EN CHANGESELECTED: ' + prov.id);
    this.provinciaid = prov.id;
  }
  register() {
    if (this.registerForm.valid) {

      let empresa = {
        email: this.empresa.email,
        password: this.empresa.password,
        nombre: this.empresa.nombre,
        provinciaid: this.provinciaid,
        localidad: this.empresa.localidad,
        direccion: this.empresa.direccion,
      };
      this.empresaService.register(empresa).subscribe(
        (data) => {
          console.log(data);
          this.route.navigate(['/login']);
        },
        (error) => {
          this.error = true;
          console.log(empresa);
        }
      );
    }else{
this.registerForm.markAllAsTouched();
    }
  }
  ngOnInit() {



    this.provinciaService.getAll().subscribe(
      (data) => {
        this.listaProv = data;
        console.log(data);
      },
      (error) => {
        this.error = true;
      }
    );
  }
}
