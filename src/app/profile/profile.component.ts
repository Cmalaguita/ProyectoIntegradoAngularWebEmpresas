import { Provincia } from './../_models/provincia';
import { ProvinciaService } from './../_services/provincia.service';
import { ProfileService } from './../_services/profile.service';
import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    name = 'Petunia Gregor';
  provincia!:Provincia | undefined;
  empresa!:Empresa;
  error:boolean=false;
  id:string|any= sessionStorage.getItem('id');
  constructor(private profileService:ProfileService,private provinciaService:ProvinciaService) {
    this.empresa={
      email:"",
      password:"",
      provinciaid:0
    };
   }
buildProfile(){
  this.profileService.getEmpresa(this.id).subscribe((data)=>{
    this.empresa=data;
console.log(this.empresa)

  },
  error=>{
    this.error=true;
    console.log(this.empresa);
        });
}

  ngOnInit() {
this.buildProfile();
  }

}
