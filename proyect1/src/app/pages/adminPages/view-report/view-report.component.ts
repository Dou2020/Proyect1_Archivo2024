import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { ReportsComponent } from '../reports/reports.component';
import { EmployeerService } from '../../../services/employeer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-report',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    ReportsComponent
  ],
  templateUrl: './view-report.component.html',
  styleUrl: './view-report.component.css'
})
export class ViewReportComponent implements OnInit{

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
