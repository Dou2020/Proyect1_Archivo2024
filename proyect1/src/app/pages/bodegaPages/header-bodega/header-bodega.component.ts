import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-bodega',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-bodega.component.html',
  styleUrl: './header-bodega.component.css'
})
export class HeaderBodegaComponent implements OnInit {
  private comun:string[] = ["nav-link","text-white"];
  private select:string[] = ["nav-link","text-white","active"];
  classProduct: string[] = this.select;
  classAddProduct: string[] = this.comun;

  @Input()
  usuario: string = ''

  @Input()
  seleccionar: string = "";

  ngOnInit(): void {
    switch (this.seleccionar) {
      case "1":
        this.classProduct = this.select;
        this.classAddProduct= this.comun;
        break;
      case "2":
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
