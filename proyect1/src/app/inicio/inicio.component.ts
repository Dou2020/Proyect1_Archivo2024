import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectBodegaService } from "./../select-bodega.service";
import { EmployeerService } from "./../services/employeer.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit{
  

  userForm: FormGroup;
  user: FormControl;
  pass: FormControl;
  
  constructor(private servicio: SelectBodegaService,private employeer: EmployeerService, private router:Router){
    this.user = new FormControl('');
    this.pass = new FormControl('');

    this.userForm = new FormGroup({
      usuario: this.user,
      pass: this.pass,
    });
  }
  
  ngOnInit(): void {
    //this.getData()
  }

  getData(){
    this.servicio.getData().subscribe({
      next: (data) =>{
        console.log(data);
      },
      error: (e) =>{
        console.log(e);
      }
    })
  }
  handleSubmit(): void {
    this.employeer.postValue(this.userForm.value).subscribe({
      next: (data) =>{
        if (data[0].estado != undefined) {
          if (data[0].estado == '1') {
            this.employeer.setUsuario(data);
          }else{
            this.router.navigate(['/']);
          }
        }else{
          this.router.navigate(['/']);             
        }
        switch (data[0].rol) {
          case 'caj':
            this.router.navigate(['/cajero']);
            break;
          case 'adm':
            this.router.navigate(['/admin']);
            break
          case 'bod':
            this.router.navigate(['/bodega']);
            break;
          case 'inv':
            this.router.navigate(['/inven']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
        //console.log(this.employeer.getUsuario()[0].usuario)
      },
      error: (e) =>{
        console.log(e)
        this.router.navigate(['/']);
            
      }
    })
  }

}
