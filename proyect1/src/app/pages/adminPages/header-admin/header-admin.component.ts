import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EmployeerService } from '../../../services/employeer.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit{

  private comun:string[] = ["nav-link","text-white"];
  private select:string[] = ["nav-link","text-white","active"];
  
  classHome: string[] = this.select;
  classEmpleado: string[] = this.comun;
  classReporte: string[] = this.comun;
  classTarjeta: string[] = this.comun;


  @Input() usuario: any[] = [];
  @Input() categoria: string = "";

  constructor(private router:Router, private employee: EmployeerService){}
  
  ngOnInit(): void {
    this.updatePage();      
  }

  // actualizar el selector 
  updatePage(){
    switch (this.categoria) {
      case "1":
        this.classTarjeta = this.classEmpleado = this.classReporte = this.comun;
        this.classHome = this.select;
        break;
      case "2":
        this.classHome = this.classTarjeta = this.classReporte = this.comun;
        this.classEmpleado = this.select;
        break;
      case "3":
        this.classHome = this.classTarjeta = this.classEmpleado = this.comun;
        this.classReporte = this.select;
        break;
      case "4":
        this.classHome = this.classEmpleado = this.classReporte = this.comun;
        this.classTarjeta = this.select;
        break;
    
      default:
        break;
    }
  }

  cerrarSesion(){
    console.log("cerrarSesion")
    this.employee.setUsuario([]);
    this.router.navigate(['/']);
  }


}
