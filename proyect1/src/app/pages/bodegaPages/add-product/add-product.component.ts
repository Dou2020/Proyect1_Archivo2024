import { Component, Input, OnInit, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';

import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderBodegaComponent } from '../header-bodega/header-bodega.component';
import { ViewProductService } from '../../../services/bodega/view-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    HeaderBodegaComponent,
    ReactiveFormsModule,
    FormsModule
    
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  // form validate
  codFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  precioFormControl = new FormControl('', [Validators.required]);
  cantidadFormControl = new FormControl('', [Validators.required]);
  
  producto: any[] = [{cantidad:""}];

  // Input of form update 
  @Input() codigo: string = "";
  @Input() subcursal: string="";

  constructor(private product:ViewProductService, private router: Router){}

  ngOnInit(): void { 
    //console.log(this.codigo)
    if (this.codigo !== "") {
      const userForm: any = new FormGroup({
        cod: new FormControl(this.codigo),
        sub: new FormControl(this.subcursal),
      });
  
      this.product.postProductDetail( userForm.value ).subscribe({
        next:(value) =>{
          console.log(value)
          this.producto = value;
        },error(err){
          console.log(err)
        }
      })
    }

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickBotton(){
    this.router.navigate(['/bodega'])
  }
  
  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }

}
