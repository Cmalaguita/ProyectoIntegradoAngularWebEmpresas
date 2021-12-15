import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../_services/empresa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public empresaService: EmpresaService) { }

  ngOnInit() {
  }

}
