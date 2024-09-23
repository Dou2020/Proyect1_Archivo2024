import { Component, OnInit } from '@angular/core';
import { ViewEmployeesService } from '../../../services/admin/view-employees.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  employeers: any[] = [];
  
  constructor(private employees:ViewEmployeesService){}

  ngOnInit(): void {
      this.listEmployeers()
  }

  listEmployeers(){
    this.employees.getviewEmployees().subscribe({
      next: (value) => {
        this.employeers = value;
      },error:(err) =>{
        console.log(err);
      }
    })
  }


}
