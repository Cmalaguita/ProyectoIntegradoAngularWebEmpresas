import { Alumno } from './../_models/alumno';
import { CicloService } from './../_services/ciclo.service';
import { ApplyService } from './../_services/apply_service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-premium-list',
  templateUrl: './student-premium-list.component.html',
  styleUrls: ['./student-premium-list.component.css']
})
export class StudentPremiumListComponent implements OnInit {
alumnos:Alumno[]=[];
  constructor(private applyService:ApplyService, private cicloService:CicloService) { }

  getAlumnos(){
   this.applyService.getStudentsPremium().subscribe((response)=>{
     if (response!=null) {
       this.alumnos=response;
     }
   });
  }

  ngOnInit() {
    this.getAlumnos();
  }

}
