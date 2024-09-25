import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeerService } from '../../../services/employeer.service';

@Component({
  selector: 'app-header-cajero',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-cajero.component.html',
  styleUrl: './header-cajero.component.css'
})
export class HeaderCajeroComponent implements OnInit {

  private comun:string[] = ["nav-link","text-white"];
  private select:string[] = ["nav-link","text-white","active"];

  classFactura: string[] = this.select;
  classAddProduct: string[] = this.comun;

  constructor(private router:Router, private employee: EmployeerService){}
  
  @Input() usuario: any[] = [];
  @Input() seleccionar: string = "";
  
  
  ngOnInit(): void {
      
  }

  cerrarSesion(){
    console.log("cerrarSesion")
    this.employee.setUsuario([]);
    this.router.navigate(['/']);
  }

}
