import { OfferService } from './../_services/offer.service';
import { PosicionDeTrabajo } from './../_models/posiciondetrabajo';
import { Ciclo } from './../_models/ciclo';
import { Familia } from './../_models/familia';
import { Tipociclo } from './../_models/tipociclo';
import { CicloService } from './../_services/ciclo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  listaTipos: Tipociclo[] = [];
  listaFamilias: Familia[] = [];
  listaCiclos: Ciclo[] = [];
  listaCiclosEnPosicion: Ciclo[]=[];
  CicloEnPosicion! : Ciclo;
  error: boolean = false;
  idFamilia!:number;
  idTipo!:number;
  idCiclo!:number;
  posicionDeTrabajo!:PosicionDeTrabajo;
  constructor(private cicloService: CicloService,private offerService:OfferService) {

this.posicionDeTrabajo={
  nombre:"",
  fechaInicio:new Date(),
  fechaFin:new Date(),
  empresaid:Number(sessionStorage.getItem("id")),
  ciclos:[],
  descripcion:"",
  remuneracion:0,
  horario:""
}

  }

  changeselectedTipo(Tipociclo:Tipociclo){
this.idTipo=Tipociclo.id
console.log("IDTIPOCICLO"+this.idTipo)
  }

  changeselectedFamilia(Familia:Familia){
    this.idFamilia=Familia.id
    console.log("IDFAMILIA "+this.idFamilia)
      }
      changeselectedCiclo(Ciclo:Ciclo){
        this.CicloEnPosicion=Ciclo;

        this.listaCiclosEnPosicion.push(this.CicloEnPosicion);
        console.log(this.listaCiclosEnPosicion);
          }
  crearPosicion(){
    let posicionDeTrabajo={
      nombre:this.posicionDeTrabajo.nombre,
      fechaInicio:this.posicionDeTrabajo.fechaInicio,
      fechaFin:this.posicionDeTrabajo.fechaFin,
      empresaid:Number(sessionStorage.getItem("id")),
      ciclos:this.listaCiclosEnPosicion,
      descripcion:this.posicionDeTrabajo.descripcion,
      horario:this.posicionDeTrabajo.horario,
      remuneracion:this.posicionDeTrabajo.remuneracion
      };
      console.log(posicionDeTrabajo);
      this.offerService.createOffer(posicionDeTrabajo).subscribe((result)=>{
        console.log(result);
        window.location.reload();
      });
  }

  cargarCiclos(){
    this.cicloService.getCiclosByFamiliaAndTipo(this.idTipo.toString(),this.idFamilia.toString()).subscribe(
      (data) => {
        this.listaCiclos = data;
        console.log(data);
      },
      (error) => {
        this.error = true;
        alert("Debe seleccionar la familia profesional y el tipo de ciclo primero");
      }
    );
  }

  ngOnInit(): void {
    this.cicloService.getAllTipos().subscribe((tipos) => {
      this.listaTipos = tipos;
      console.log(this.listaTipos);
    },
    (error) => {
      this.error = true;
      alert("No se han podido cargar los tipos de ciclo");
    });
    this.cicloService.getAllFamilias().subscribe((familias) => {
      this.listaFamilias = familias;
      console.log(this.listaFamilias);
    },

    (error) => {
      this.error = true;
      alert("No se han podido cargar las familias profesionales");
    }
    );
  }
}
