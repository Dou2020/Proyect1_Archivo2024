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
    this.employeer.postType(this.userForm.value).subscribe({
      next: (data) =>{
        console.log("data: ",data[0].type_personal)
        switch (data[0].type_personal) {
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
      },
      error: (e) =>{
        console.log(e)
      }
    })
  }

}
