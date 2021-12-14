import { Empresa } from './../_models/empresa';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empresa! :Empresa;

  constructor() {}

  login() {
    console.log(this.empresa.email);
    console.log(this.empresa.password);
  }

  ngOnInit() {
  }

}
