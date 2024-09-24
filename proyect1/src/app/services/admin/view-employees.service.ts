import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewEmployeesService {

  private Url = "http://localhost:3002/api/admin/viewEmployees"

  private Url2 = "http://localhost:3002/api/admin/viewEmployee"
  
  constructor(private http: HttpClient) { }

  getviewEmployees(){
    return this.http.get<any[]>(this.Url);
  }

  //visualizar el empleado
  postviewEmployee(value:any){
    return this.http.post<any>(this.Url2,value);
  }
}
