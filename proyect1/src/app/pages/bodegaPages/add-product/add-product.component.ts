import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderBodegaComponent } from '../header-bodega/header-bodega.component';
import { ViewProductService } from '../../../services/bodega/view-product.service';

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
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  
  producto: any[] = [{cantidad:""}];

  // Input of form update 
  @Input() codigo: string = "";

  constructor(private product:ViewProductService){}

  ngOnInit(): void { 
    //console.log(this.codigo)
    const userForm: any = new FormGroup({
      cod: new FormControl(this.codigo),
      sub: new FormControl('CENTRO1'),
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

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
