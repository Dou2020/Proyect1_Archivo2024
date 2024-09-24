import { Component, OnInit } from '@angular/core';
import {ClienteCardService} from './../../../services/admin/cliente-card.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private clienteCard: ClienteCardService,private router:Router){}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.clienteCard.getClientCard().subscribe({
      next: (value) => {
          //console.log(value);
          this.clientCards = value;
      },error: (err) =>  {
          console.log(err);
      }
    })
  }

  postUpdateCard(tarjeta:string):void{
    console.log("cambio de tarjeta "+tarjeta)

    const tarj = new FormGroup({
      card: new FormControl(tarjeta)
    });

    this.clienteCard.postUpdateTypeCard(tarj.value).subscribe({
      next: (value) => {
        console.log(value)
        this.getData();
      },error: (err) => {
        console.log(err);
      }
    })
  }

  postInsertCard(){

  }

  tipoButton(tipo:string): string[]{
    //console.log(tipo);
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
          return ["btn","btn-primary","w-100","disabled"]
    
      default:
       return ["btn","btn-secondary","w-100","disabled"];
    }
  }

 
}
