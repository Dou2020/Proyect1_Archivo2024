import { Component, OnInit } from '@angular/core';
import { HeaderCajeroComponent } from '../cajeroPages/header-cajero/header-cajero.component';
import { EmployeerService } from '../../services/employeer.service';
import { Router } from '@angular/router';
import { FacturaInsertComponent } from '../cajeroPages/factura-insert/factura-insert.component';

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [
    HeaderCajeroComponent,
    FacturaInsertComponent,
  ],
  templateUrl: './cajero.component.html',
  styleUrl: './cajero.component.css'
})
export class CajeroComponent implements OnInit{
  
  usuario: any[] = [];

  constructor(private employee:EmployeerService, private router:Router){
    this.usuario = employee.getUsuario();
    console.log(this.usuario)

  }

  ngOnInit(): void {
      if (this.usuario.length != 1) {
        this.router.navigate(['/'])
      }
      if (this.usuario[0]?.rol != "caj") {
        this.router.navigate(['/'])
      }
  }

}
