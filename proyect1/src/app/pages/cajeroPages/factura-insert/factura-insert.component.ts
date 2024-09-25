import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ViewProductService } from '../../../services/bodega/view-product.service';
import { ViewClientService } from '../../../services/cajero/view-client.service';

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
    MatButtonModule
  ],
  templateUrl: './factura-insert.component.html',
  styleUrl: './factura-insert.component.css'
})
export class FacturaInsertComponent implements OnInit {

  // required of the form
  noFormControl = new FormControl('', [Validators.required]);
  nitFormControl = new FormControl('', [Validators.required]);

  usuario: any[]= [];
  productos: any[]=[];

  @Input() cajero: any[]=[];

  constructor(private router: Router, private products:ViewProductService, private client: ViewClientService){}

  ngOnInit(): void {
    this.getProducts();
  }

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

  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' 
  
  }

}
