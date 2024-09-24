import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {

  private apiUrl = "http://localhost:3002/api/admin/updateEmployee"
  
  constructor(private http:HttpClient) { }

  postUpdateEmployee(value:any){
    return this.http.post<any[]>(this.apiUrl,value);
  }

}
