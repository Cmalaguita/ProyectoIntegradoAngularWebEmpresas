import { EmpresaService } from './../_services/empresa.service';
import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  empresa!: Empresa;
  listaProv:string[]=["Málaga","Córdoba","Cádiz", "Granada"];
  constructor(public empresaService: EmpresaService,public router: Router) {}

  register() {
    // const empresa = {
    //   email: this.empresa.email,
    //   password: this.empresa.password,
    //   name: this.empresa.name,
    //   provinceid: this.empresa.provinceid,
    //   town: this.empresa.town,
    //   address: this.empresa.address,
    // };
    // this.empresaService.register(empresa).subscribe((data) => {
    //   console.log(data);
    //   this.router.navigateByUrl("login")
    // });
  }
  ngOnInit() {}
}
