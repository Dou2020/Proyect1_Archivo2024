import { Component, Input, OnInit,signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ViewEmployeesService } from '../../../services/admin/view-employees.service';
import { UpdateEmployeeService } from '../../../services/admin/update-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-empleado',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-empleado.component.html',
  styleUrl: './create-empleado.component.css',
})
export class CreateEmpleadoComponent  implements OnInit{

  // validaciones form
  userFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  rolFormControl = new FormControl('', [Validators.required]);
  subFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);

  @Input() usuario:string= "";

  employeer: any[]=[];

  constructor(private employee:ViewEmployeesService, private employeeUpdate:UpdateEmployeeService, private router: Router) { }

  ngOnInit() {
    console.log(this.usuario)
    
    if (this.usuario !== "") {
      const userForm: any = new FormGroup({
        usuario: new FormControl(this.usuario)
      });

      this.employee.postviewEmployee(userForm.value).subscribe({
        next: (value) => {
          this.employeer = value;
          console.log(this.employeer)
        },error: (err) =>  {
          console.log(err);
        }
      })
    } 
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }

    if (f.value.rol) {
      console.log("ingresar usuario")
      this.employeeUpdate.postInsertEmployee(f.value).subscribe({
        next:(value) =>{
          this.router.navigate(['/admin'])
        },error:(err) =>{
          console.log(err)
        }
      })
    }

    if (f.value?.pass !== "") {
      console.log("se va a actualizar usuario")
      this.employeeUpdate.postUpdateEmployee(f.value).subscribe({
        next: (value)=>{
          this.router.navigate(['/admin'])
        },error:(err) =>{
          console.log(err)
        }      
      })
    }

  }
}
