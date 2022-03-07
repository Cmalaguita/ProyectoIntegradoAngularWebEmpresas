import { Router } from '@angular/router';
import { PremiumDialogComponent } from './../premium-dialog/premium-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaService } from '../_services/empresa.service';

@Component({
  selector: 'app-navigationDrawer',
  templateUrl: './navigationDrawer.component.html',
  styleUrls: ['./navigationDrawer.component.css'],
})
export class NavigationDrawerComponent implements OnInit {

  constructor(private empresaService:EmpresaService,public dialog: MatDialog) {}
premium:boolean=true;
nopremium:boolean=false;
  ngOnInit() {

    this.empresaService.comprobarPremium(sessionStorage.getItem('id')!).subscribe((response)=>{
      if (response!=null) {
      this.premium=false;
      this.nopremium=true;
    }else
    {

      this.nopremium=false;
    }
  },error=>{
    })
  }

  cerrarSesion(){
sessionStorage.clear();
window.location.reload();
  }

  openModalPremium() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Contratar Premium',
    };

    const dialogRef = this.dialog.open(PremiumDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
      console.log(result);
    });
  }
}
