import { Component, OnInit } from '@angular/core';
import { ViewProductService } from "./../../../services/bodega/view-product.service";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{
  
  // variables globales
  products: any[] = [];

  constructor(private producto:ViewProductService){    }

  ngOnInit(): void {
    this.getProduct("CENTRO1")    
  }

  // obtiene el listado de producto no igresado a la bodega
  getProduct(subcursal:string):void{

    const bodega = new FormGroup({
      sub: new FormControl(subcursal)
    });
  
    this.producto.postProduct(bodega.value).subscribe({
      next:(value) =>{
        console.log(value);
        this.products = value
      },error:(err) =>{
        console.log(err);   
      }
    })
  }

  tipoButton(value:string):any[] {
    
    if (value == "N/A") {
      return ["btn","btn-primary","w-100"];
    }
    return ["btn","btn-warning","w-100"];
  }
  tipoOpcion(value:string):any{
    if (value =="N/A") {
      return "Asignar";
    }
    return "Actualizar";
  }
  postUpdate(){

  }
}