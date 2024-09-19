import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  private apiUrl = 'http://localhost:3002/api/empleado/type';
  
  constructor(private http: HttpClient) { }


  postType(user:any[]) {
    console.log("service ",user);
    return this.http.post<any[]>(this.apiUrl,user);
  }

}
