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
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  empresaid:string|any= sessionStorage.getItem('id');
  error:boolean=false;
  listapos:Array<PosicionDeTrabajo>=[];
  posicionDetallada!: PosicionDeTrabajo;
  listapply:Array<Alumno>=[]
  constructor(private offerService:OfferService,public dialog:MatDialog,private applyService:ApplyService) {


  }
  getApplies(idPosicion:string){
    this.applyService.getAppliesByOffer(idPosicion).subscribe((data)=>{
      this.listapply=data;

      console.log(this.listapply)
    },
    
    
    error=>{
      this.error=true;
      alert("las posiciones no se han cargado correctamente.")
    });
    
    }

loadOffers(){
this.offerService.getOffersByEmpresaId(this.empresaid).subscribe((data)=>{
  this.listapos=data;
 this.listapos.forEach(pos => {
  this.applyService.getAppliesByOffer(pos.id?.toString()).subscribe((data)=>{

    pos.listaInscritos=data;
  });
 });
  console.log(this.listapos)
},


error=>{
  this.error=true;
  alert("las posiciones no se han cargado correctamente.")
});

}
openModal() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
  id: 1,
  title: 'Crear Posición'
  };

  const dialogRef = this.dialog.open(DialogComponent,{
width:'70%',


  });

  dialogRef.afterClosed().subscribe(result => {
  console.log("Dialog was closed")
  console.log(result)

  });
}
  ngOnInit() {
    this.loadOffers();
  }

}
