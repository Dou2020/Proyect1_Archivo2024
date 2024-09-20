import { Component } from '@angular/core';
import { ViewProductComponent } from "./../bodegaPages/view-product/view-product.component";
import { AddProductComponent } from "./../bodegaPages/add-product/add-product.component";

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [ViewProductComponent,AddProductComponent],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent {
  private comun:string[] = ["nav-link","text-white"];
  private select:string[] = ["nav-link","text-white","active"];
  classProduct: string[] = this.select;
  classAddProduct: string[] = this.comun;
  categoria: number = 0;

  updatePage(value:number){
    this.categoria = value;
    switch (value) {
      case 1:
        this.classProduct = this.select;
        this.classAddProduct= this.comun;
        break;
      case 2:
        this.classProduct = this.comun;
        this.classAddProduct= this.select;
        break;
    
      default:
        this.classProduct = this.select;
        this.classAddProduct= this.comun;
        break;
    }
  }


}
