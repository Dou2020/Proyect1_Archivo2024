import { Component } from '@angular/core';
import { InsertCartComponent } from "./../adminPages/insert-cart/insert-cart.component";
import { HomeComponent } from "./../adminPages/home/home.component";
import { CreateEmpleadoComponent } from "./../adminPages/create-empleado/create-empleado.component";
import { ViewReportesComponent } from "./../adminPages/view-reportes/view-reportes.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [InsertCartComponent,HomeComponent,CreateEmpleadoComponent,ViewReportesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private comun:string[] = ["nav-link","text-white"];
  private select:string[] = ["nav-link","text-white","active"];
  
  categoria: number = 0;
  classHome: string[] = this.select;
  classEmpleado: string[] = this.comun;
  classReporte: string[] = this.comun;
  classTarjeta: string[] = this.comun;

  updatePage(categoria:number){
    this.categoria= categoria;
    switch (categoria) {
      case 1:
        this.classTarjeta = this.classEmpleado = this.classReporte = this.comun;
        this.classHome = this.select;
        break;
      case 2:
        this.classHome = this.classTarjeta = this.classReporte = this.comun;
        this.classEmpleado = this.select;
        break;
      case 3:
        this.classHome = this.classTarjeta = this.classEmpleado = this.comun;
        this.classReporte = this.select;
        break;
      case 4:
        this.classHome = this.classEmpleado = this.classReporte = this.comun;
        this.classTarjeta = this.select;
        break;
    
      default:
        break;
    }
  }
}
