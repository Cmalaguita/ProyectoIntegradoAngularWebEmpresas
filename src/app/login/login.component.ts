import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empresa! :Empresa;
  error:boolean=false;

  constructor(private empresaService:EmpresaService,private route:Router) {
    this.empresa={
      email:"",
      password:""
    };
  }

  login()  {
    const empresa = {email: this.empresa.email, password: this.empresa.password};

    this.empresaService.login(empresa).subscribe( (data) => {
    sessionStorage.setItem('id',data.body!.toString())
    sessionStorage.setItem('authorization',data.headers.get('authorization')!)
      console.log(data);
      this.route.navigate(['/navigation'])
    },error=>{
this.error=true;

    });
  }

  ngOnInit() {
  }

}
