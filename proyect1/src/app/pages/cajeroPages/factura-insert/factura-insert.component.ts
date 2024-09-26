import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ViewProductService } from '../../../services/bodega/view-product.service';
import { ViewClientService } from '../../../services/cajero/view-client.service';

import {MatTableModule} from '@angular/material/table';
import { InsertFacturaService } from '../../../services/cajero/insert-factura.service';

@Component({
  selector: 'app-factura-insert',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './factura-insert.component.html',
  styleUrl: './factura-insert.component.css'
})
export class FacturaInsertComponent implements OnInit {

  // required of the form
  noFormControl = new FormControl('', [Validators.required]);
  nitFormControl = new FormControl('', [Validators.required]);

  usuario: any[] = [];
  productos: any[] = [];
  addProducts: any[] = [];
  factura: any = {};
  productFac: any[] = [];

  @Input() cajero: any[]=[];

  constructor(private router: Router, private products:ViewProductService, private client: ViewClientService, private fact: InsertFacturaService){}

  ngOnInit(): void {
    this.getProducts();
  }

  // search client
  getCLient(F:NgForm){
    console.log("get Client")
    console.log(F.value)
    this.client.postClientView(F.value).subscribe({
      next:(value)=>{
        this.usuario = value;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  // LISTADO DE PRODUCTO
  getProducts(){

    const p = new FormGroup({
      sub: new FormControl(this.cajero[0].subcursal)
    });

    this.products.postProduct(p.value).subscribe({
      next:(value)=>{
        this.productos = value;
      }, error:(err)=>{
        console.log(err)
      }
    })
  }

  getProductsFac(){
    this.fact.viewProductFacPost({no_factura: this.factura?.no_factura}).subscribe({
      next:(value) =>{
        this.productFac = value;
      }, error:(err) =>{
        console.log(err);
      }
    })
  }


  onSubmit(f: NgForm) {
  
    console.log(f.value); // { first: '', last: '' 
    
    this.fact.insertFacturaPost(f.value).subscribe({
      next:(value)=>{
        console.log("Agregado factura")
        this.factura = f.value;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  addProduct(f:NgForm){
    
    if (this.factura.no_factura) {
      
      const final = {
        no_factura: this.factura.no_factura,
        ...f.value
      }
      console.log(final);

      this.fact.insertProductFacPost(final).subscribe({
        next:(value)=>{
          this.getProductsFac();
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  }

}
