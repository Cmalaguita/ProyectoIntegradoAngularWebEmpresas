import { ProfileDialogComponent } from './../profile-dialog/profile-dialog.component';
import { Provincia } from './../_models/provincia';
import { ProvinciaService } from './../_services/provincia.service';
import { ProfileService } from './../_services/profile.service';
import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { PosicionDeTrabajo } from '../_models/posiciondetrabajo';
import { Alumno } from '../_models/alumno';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name = 'Petunia Gregor';
  provincia!: Provincia | undefined;
  empresa!: Empresa;
  error: boolean = false;
  id: string | any = sessionStorage.getItem('id');
  constructor(
    private profileService: ProfileService,
    private provinciaService: ProvinciaService,
    private profileDialog: MatDialog
  ) {
    this.empresa = {
      email: '',
      password: '',
      provinciaid: 0,
    };
  }
  buildProfile() {
    this.profileService.getEmpresa(this.id).subscribe(
      (data) => {
        this.empresa = data;
        console.log(this.empresa);
      },
      (error) => {
        this.error = true;
        console.log(this.empresa);
      }
    );
  }

  openModalUpdate(e: Empresa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 2,
      title: 'Editar perfil',
    };

    const dialogRef = this.profileDialog.open(ProfileDialogComponent, {
      data: {
        e: e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.buildProfile();
  }
}
