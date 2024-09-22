import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  private apiUrl = 'http://localhost:3002/api/empleado/type';
  
  constructor(private http: HttpClient) { }

  private usuario: { user: string; } = {user:""} ;

  postType(user:any[]) {
    this.usuario = user[0].usuario;
    console.log(user[0])
    return this.http.post<any[]>(this.apiUrl,user);
  }
  getUsuario(){
    return this.usuario;
  }

}
