import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empresa! :Empresa;

  constructor(public empresaService: EmpresaService,public router: Router) {}

  login() {
    // const empresa = {email: this.empresa.email, password: this.empresa.password};
    // this.empresaService.login(empresa).subscribe( data => {
    //   console.log(data);
    //   this.router.navigateByUrl('/')
    // });
  }

  ngOnInit() {
  }

}
