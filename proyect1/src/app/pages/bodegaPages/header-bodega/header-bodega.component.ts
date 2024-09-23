import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeerService } from '../../../services/employeer.service';

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

  constructor(private router:Router, private employee: EmployeerService){}

  @Input() usuario: any[] = [];
  @Input() seleccionar: string = "";

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

  cerrarSesion(){
    console.log("cerrarSesion")
    this.employee.setUsuario([]);
    this.router.navigate(['/']);
  }

}
