import { ContactDialogComponent } from './../contact-dialog/contact-dialog.component';
import { Inscripcion } from './../_models/inscripcion';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PosicionDeTrabajo } from '../_models/posiciondetrabajo';
import { OfferService } from '../_services/offer.service';
import { ApplyService } from '../_services/apply_service';
import { Alumno } from '../_models/alumno';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  empresaid: string | any = sessionStorage.getItem('id');
  error: boolean = false;
  listapos: Array<PosicionDeTrabajo> = [];
  posicionDetallada!: PosicionDeTrabajo;
  listapply: Array<Alumno> = [];

  constructor(
    private offerService: OfferService,
    public dialog: MatDialog,
    private applyService: ApplyService
  ) {}
  dateFormat(date: string) {
    return date.split('T')[0];
  }
  changeselected(estado: string, inscripcion: Inscripcion) {
    inscripcion.estadoInscripcion = estado;
    this.applyService.updateApply(inscripcion).subscribe((data) => {
      console.log(data);
    });
  }
  loadOffers() {
    this.offerService.getOffersByEmpresaId(this.empresaid).subscribe(
      (data) => {
        this.listapos = data;
        this.listapos.forEach((pos) => {
          this.applyService
            .getAppliesByOffer(pos.id?.toString())
            .subscribe((data) => {
              pos.listaInscritos = data;
            });
        });
      },

      (error) => {
        this.error = true;
        alert('las posiciones no se han cargado correctamente.');
      }
    );
  }
  borrarPosicion(id:string){
    if (id!=null) {
      console.log("ID PARA BORRAR "+ id)
      this.offerService.delete(id).subscribe((response)=>{
        if (response) {

          window.location.reload();
        }
      });
    }
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Crear Posición',
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
      console.log(result);
    });
  }

  openModalContacto(p: PosicionDeTrabajo, a: Alumno | undefined) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 2,
      title: 'Mensaje para el candidato',
    };

    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {
        p: p,
        a: a,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
      console.log(result);
    });
  }
  ngOnInit() {
    this.loadOffers();
  }
}
