import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from "../header-admin/header-admin.component";
import { EmployeerService } from '../../../services/employeer.service';
import { CreateEmpleadoComponent } from '../create-empleado/create-empleado.component';
import { ActivatedRoute, Router } from '@angular/router';

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
export class ViewUserComponent implements OnInit{

  usuario: any[] = [];
  employeer: string = "";

  constructor(private employee: EmployeerService,private route: ActivatedRoute,private router:Router){
    this.usuario = employee.getUsuario();
    this.employeer = route.snapshot.params['usuario']
  }

  ngOnInit(): void {
    if (this.usuario.length != 1 ) {
      this.router.navigate(['/']);
    }
    
  }


}
