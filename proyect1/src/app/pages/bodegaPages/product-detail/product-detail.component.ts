import { Component, OnInit } from '@angular/core';

import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { HeaderBodegaComponent } from "../header-bodega/header-bodega.component";
import { AddProductComponent } from '../add-product/add-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeerService } from '../../../services/employeer.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    HeaderBodegaComponent,
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    HeaderBodegaComponent,
    AddProductComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  codProduct: string = "";
  usuario: any[] = [];

  constructor(private router: Router ,private route: ActivatedRoute, private employeer: EmployeerService){
    
    this.codProduct = route.snapshot.params['codProduct'];
    this.usuario = employeer.getUsuario();
  }

  ngOnInit(): void {
    if (this.usuario.length != 1 ) {
      this.router.navigate(['/']);
    }
  }

}
