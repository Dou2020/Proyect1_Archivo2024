import { Component, OnInit } from '@angular/core';
import { InsertCartComponent } from "./../adminPages/insert-cart/insert-cart.component";
import { HomeComponent } from "./../adminPages/home/home.component";
import { CreateEmpleadoComponent } from "./../adminPages/create-empleado/create-empleado.component";
import { ViewReportesComponent } from "./../adminPages/view-reportes/view-reportes.component";
import { HeaderAdminComponent } from '../adminPages/header-admin/header-admin.component';
import { EmployeerService } from '../../services/employeer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    InsertCartComponent,
    HomeComponent,
    CreateEmpleadoComponent,
    ViewReportesComponent,
    HeaderAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  usuario: any[]=[];

  constructor(private employee: EmployeerService, private router: Router){
    // Obtiene el valor del empleado
    this.usuario = employee.getUsuario();
  }

  ngOnInit(): void {
    
    // valida si existe un usuario
    if (this.usuario.length !=1) {
      this.router.navigate(['/'])
    }  
    //valida que es del rol admin
    if (this.usuario[0]?.rol !="adm") {
      this.router.navigate(['/']);
    }  
  }
}
