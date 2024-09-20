import { Component, OnInit } from '@angular/core';
import {ClienteCardService} from './../../../services/admin/cliente-card.service';

@Component({
  selector: 'app-insert-cart',
  standalone: true,
  imports: [],
  templateUrl: './insert-cart.component.html',
  styleUrl: './insert-cart.component.css'
})
export class InsertCartComponent implements OnInit {


  clientCards: any[] = [] ;
  myClasses = ['btn','btn-warning'];

  constructor(private clienteCard: ClienteCardService){}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.clienteCard.getClientCard().subscribe({
      next: (value) => {
          console.log(value);
          this.clientCards = value;
      },error: (err) =>  {
          console.log(err);
      }
    })
  }
  postUpdate(){
    console.log("cambio de tarjeta")
  }

  tipoButton(tipo:string): string[]{
    console.log(tipo);
    switch (tipo) {
      case "SOLICITAR ORO":
        return ["btn","btn-warning","w-100"];
      case "SOLICITAR PLATINO":
        return ["btn","btn-light","w-100"];
      case "SOLICITAR DIAMANTE":
        return ["btn","btn-info","w-100"]
      case "MAXIMO":
        return ["btn","btn-success","w-100","disabled"]
        case "S/T":
          return ["btn","btn-primary","w-100"]
    
      default:
       return ["btn","btn-secondary","w-100","disabled"];
    }
  }

 
}
