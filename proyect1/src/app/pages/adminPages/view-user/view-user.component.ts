import { Component } from '@angular/core';
import { AdminComponent } from "../../admin/admin.component";
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { EmployeerService } from '../../../services/employeer.service';
import { CreateEmpleadoComponent } from '../create-empleado/create-empleado.component';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
     HeaderAdminComponent,
     CreateEmpleadoComponent
    ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

  usuario: any[] = [];

  constructor(private employee: EmployeerService){}

}
