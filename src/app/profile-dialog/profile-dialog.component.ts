import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Empresa } from '../_models/empresa';
import { Provincia } from '../_models/provincia';
import { EmpresaService } from '../_services/empresa.service';
import { ProvinciaService } from '../_services/provincia.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
  e:Empresa={
    email: ''
  }
  empresa!: Empresa;
  error: boolean = false;
  provinciaid: number = 0;
  updateForm: FormGroup = new FormGroup({
    nombre:new FormControl ('', [Validators.required,Validators.nullValidator]),
    localidad:new FormControl(''),
    direccion:new FormControl('')
  });

  listaProv: Provincia[] = [];
  constructor(
    private provinciaService: ProvinciaService,
    private empresaService: EmpresaService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
  updateProfile() {

    if (this.updateForm.valid) {

      let empresa = {
        email: this.e.email ,
        nombre: this.updateForm.get('nombre')?.value,
        provinciaid: this.provinciaid,
        localidad: this.updateForm.get('localidad')?.value,
        direccion: this.updateForm.get('direccion')?.value,
      };
      console.log(empresa);
      this.empresaService.updateProfile(empresa).subscribe(
        (data) => {
          console.log(data);
          window.location.reload();
        },
        (error) => {
          this.error = true;
          console.log(empresa);
        }
      );
    }else{
this.updateForm.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.e=this.data.e;
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
