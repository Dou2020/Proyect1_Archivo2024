import { Component } from '@angular/core';
import { InsertCartComponent } from '../insert-cart/insert-cart.component';
import { EmployeerService } from '../../../services/employeer.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';

@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [
    InsertCartComponent,
    HeaderAdminComponent
  ],
  templateUrl: './view-cards.component.html',
  styleUrl: './view-cards.component.css'
})
export class ViewCardsComponent {
  
  usuario: any[]= [];

  constructor(private employee: EmployeerService){
    this.usuario = employee.getUsuario()
  }

}
