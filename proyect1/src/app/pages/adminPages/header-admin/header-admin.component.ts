import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
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

  @Input() categoria: string = "";
  
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


}
