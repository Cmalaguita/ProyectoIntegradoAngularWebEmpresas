import { Component, OnInit } from '@angular/core';
import { PosicionDeTrabajo } from '../_models/posiciondetrabajo';
import { OfferService } from '../_services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  empresaid:string|any= sessionStorage.getItem('id');
  error:boolean=false;
  listapos:Array<PosicionDeTrabajo>=[];
  constructor(private offerService:OfferService) { 


  }

loadOffers(){
this.offerService.getOffersByEmpresaId(this.empresaid).subscribe((data)=>{
this.listapos=data;
console.log(this.listapos)
},

error=>{
this.error=true;
alert("las ofertas no se han cargado correctamente.")
});
  
}

  ngOnInit() {
    this.loadOffers();
  }

}
