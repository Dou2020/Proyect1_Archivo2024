import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewEmployeesService {

  private Url = "http://localhost:3002/api/admin/viewEmployees"
  
  constructor(private http: HttpClient) { }

  getviewEmployees(){
    return this.http.get<any[]>(this.Url);
  }
}
