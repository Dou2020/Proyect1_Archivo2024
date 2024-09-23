import { Component } from '@angular/core';
import { InsertCartComponent } from "./../adminPages/insert-cart/insert-cart.component";
import { HomeComponent } from "./../adminPages/home/home.component";
import { CreateEmpleadoComponent } from "./../adminPages/create-empleado/create-empleado.component";
import { ViewReportesComponent } from "./../adminPages/view-reportes/view-reportes.component";
import { HeaderAdminComponent } from '../adminPages/header-admin/header-admin.component';

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
export class AdminComponent {
  

}
