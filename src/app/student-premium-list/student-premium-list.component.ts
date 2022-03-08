import { ContactPremiumDialogComponent } from './../contact-premium-dialog/contact-premium-dialog.component';
import { Provincia } from './../_models/provincia';
import { EmpresaService } from './../_services/empresa.service';
import { Alumno } from './../_models/alumno';
import { CicloService } from './../_services/ciclo.service';
import { ApplyService } from './../_services/apply_service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipociclo } from '../_models/tipociclo';
import { Familia } from '../_models/familia';
import { Ciclo } from '../_models/ciclo';
import { ProvinciaService } from '../_services/provincia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Empresa } from '../_models/empresa';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-student-premium-list',
  templateUrl: './student-premium-list.component.html',
  styleUrls: ['./student-premium-list.component.css'],
})
export class StudentPremiumListComponent implements OnInit {
  alumnos: Alumno[] = [];
  provincias: Provincia[] = [];
  listaTipos: Tipociclo[] = [];
  listaFamilias: Familia[] = [];
  listaCiclos: Ciclo[] = [];
  idFamilia!: number;
  idTipo!: number;
  idCiclo!: number;
  selectedCiclo!: Ciclo;
  listaProv: Provincia[] = [];
  provinciaid: number = 0;
  alumnosBusqueda: Alumno[] = [];

  constructor(
    private applyService: ApplyService,
    private cicloService: CicloService,
    private empresaService: EmpresaService,
    private route: Router,
    private provinciaService: ProvinciaService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) {}
  busquedaDeAlumnos() {
    this.alumnosBusqueda = [];

    // TODOS LOS CAMPOS TIENEN VALOR
    if (
      this.idTipo != null &&
      this.idFamilia != null &&
      this.idCiclo != null &&
      this.provinciaid > 0
    ) {
      this.alumnos.forEach((element) => {
        if (
          element.ciclo?.id == this.idCiclo &&
          element.idProvincia == this.provinciaid
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // SOLO IDTIPO
    else if (
      this.idTipo != null &&
      this.idFamilia == null &&
      this.idCiclo == null &&
      this.provinciaid == 0
    ) {
      this.alumnos.forEach((element) => {
        if (element.ciclo?.idTipo == this.idTipo) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // SOLO IDFAMILIA
    else if (
      this.idTipo == null &&
      this.idFamilia != null &&
      this.idCiclo == null &&
      this.provinciaid == 0
    ) {
      this.alumnos.forEach((element) => {

        if (element.ciclo?.idFamilia == this.idFamilia) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // SOLO IDPROVINCIA
    else if (
      this.idTipo == null &&
      this.idFamilia == null &&
      this.idCiclo == null &&
      this.provinciaid > 0
    ) {
      this.alumnos.forEach((element) => {
        if (element.idProvincia == this.provinciaid) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // IDTIPO E IDPROVINCIA
    else if (
      this.idTipo != null &&
      this.idFamilia == null &&
      this.idCiclo == null &&
      this.provinciaid > 0
    ) {
      this.alumnos.forEach((element) => {
        if (
          element.idProvincia == this.provinciaid &&
          element.ciclo?.idTipo == this.idTipo
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // IDFAMILIA E IDPROVINCIA
    else if (
      this.idTipo == null &&
      this.idFamilia != null &&
      this.idCiclo == null &&
      this.provinciaid > 0
    ) {
      this.alumnos.forEach((element) => {
        if (
          element.idProvincia == this.provinciaid &&
          element.ciclo?.idFamilia == this.idFamilia
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // IDFAMILIA E IDTIPO
    else if (
      this.idTipo != null &&
      this.idFamilia != null &&
      this.idCiclo == null &&
      this.provinciaid == 0
    ) {
      this.alumnos.forEach((element) => {
        if (
          element.ciclo?.idFamilia == this.idFamilia &&
          element.ciclo?.idTipo == this.idTipo
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // IDFAMILIA,IDTIPO E IDCICLO
    else if (
      this.idTipo != null &&
      this.idFamilia != null &&
      this.idCiclo != null &&
      this.provinciaid == 0
    ) {
      this.alumnos.forEach((element) => {
        if (
          element.ciclo?.idFamilia == this.idFamilia &&
          element.ciclo?.idTipo == this.idTipo &&
          element.ciclo.id == this.idCiclo
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // IDFAMILIA,IDTIPO E IDPROVINCIA
    else if (
      this.idTipo != null &&
      this.idFamilia != null &&
      this.idCiclo == null &&
      this.provinciaid > 0
    ) {
      this.alumnos.forEach((element) => {

        if (
          element.ciclo?.idFamilia == this.idFamilia &&
          element.ciclo?.idTipo == this.idTipo &&
          element.idProvincia == this.provinciaid
        ) {
          this.alumnosBusqueda.push(element);
        }
      });
    }
    // NO HAY DATOS
    else if (
      this.idTipo == null &&
      this.idFamilia == null &&
      this.idCiclo == null &&
      this.provinciaid == 0
    ) {
      this.alumnosBusqueda = this.alumnos;
    }

  }

  changeselectedTipo(Tipociclo: Tipociclo) {
    this.idTipo = Tipociclo.id;

  }

  changeselectedFamilia(Familia: Familia) {
    this.idFamilia = Familia.id;

  }
  changeselectedCiclo(Ciclo: Ciclo) {
    this.selectedCiclo = Ciclo;
    this.idCiclo = Ciclo.id;


  }
  changeselectedProvincia(prov: Provincia) {

    this.provinciaid = prov.id;
  }
  cargarCiclos() {
    if (this.idFamilia != null && this.idTipo != null) {
      this.cicloService
        .getCiclosByFamiliaAndTipo(
          this.idTipo.toString(),
          this.idFamilia.toString()
        )
        .subscribe(
          (data) => {
            this.listaCiclos = data;

          },
          (error) => {
            alert(
              'Debe seleccionar la familia profesional y el tipo de ciclo primero o no se han cargado correctamente los ciclos.'
            );
          }
        );
    } else {
      this.snackbar.open(
        'Debes introducir la familia profesional y el tipo de ciclo primero.',
        '',
        {
          duration: 5000,
        }
      );
    }
  }

  cargarFamiliasYCiclos() {
    this.cicloService.getAllTipos().subscribe(
      (tipos) => {
        this.listaTipos = tipos;

      },
      (error) => {
        alert('No se han podido cargar los tipos de ciclo');
      }
    );
    this.cicloService.getAllFamilias().subscribe(
      (familias) => {
        this.listaFamilias = familias;

      },

      (error) => {
        alert('No se han podido cargar las familias profesionales');
      }
    );
  }
  getAlumnos() {
    this.applyService.getStudentsPremium().subscribe((response) => {
      if (response != null) {
        this.alumnos = response;
        this.alumnosBusqueda = response;
      }
    });
  }
  cargarProvincias() {
    this.provinciaService.getAll().subscribe((provs) => {
      this.listaProv = provs;
    });
  }


  openModalContactoPremium(a: Alumno | undefined) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 2,
      title: 'Mensaje para el alumno',
    };

    const dialogRef = this.dialog.open(ContactPremiumDialogComponent, {
      data: {
        a: a,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
      console.log(result);
    });
  }
  ngOnInit() {
    this.empresaService
      .comprobarPremium(sessionStorage.getItem('id')!)
      .subscribe(
        (response) => {
          if (response != null) {
            this.cargarFamiliasYCiclos();
            this.cargarProvincias();
            this.getAlumnos();
          }
        },
        (error) => {
          this.route.navigate(['navigation']);
        }
      );
  }
}
