import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
   
    this.empresaService.login(empresa).subscribe( (data: boolean) => {
      console.log(data);
      this.route.navigate(['/home'])
    },error=>{
this.error=true;

    });
  }

  ngOnInit() {
  }

}
