import { Component } from '@angular/core';
import { ViewProductComponent } from "./../bodegaPages/view-product/view-product.component";
import { HeaderBodegaComponent } from '../bodegaPages/header-bodega/header-bodega.component';
import { EmployeerService } from '../../services/employeer.service';

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
export class BodegaComponent {
    usuario: {user:string} = {user:""}

    constructor(private employee:EmployeerService){
      this.usuario.user = employee.getUsuario().user
    }


  }


