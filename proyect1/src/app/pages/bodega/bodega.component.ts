import { Component, OnInit } from '@angular/core';
import { ViewProductComponent } from "./../bodegaPages/view-product/view-product.component";
import { HeaderBodegaComponent } from '../bodegaPages/header-bodega/header-bodega.component';
import { EmployeerService } from '../../services/employeer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [
    ViewProductComponent,
    HeaderBodegaComponent
  ],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent implements OnInit {
    usuario: any[] = [];

    constructor(private employee:EmployeerService, private router: Router){
      this.usuario = employee.getUsuario();
      //console.log("component: ")
      //console.log(this.usuario)

    }

    ngOnInit(): void {
      if (this.usuario.length != 1) {
        this.router.navigate(['/'])
      }
      if (this.usuario[0]?.rol != "bod") {
        this.router.navigate(['/'])
      }
    }


  }


