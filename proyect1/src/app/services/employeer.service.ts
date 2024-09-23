import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  private apiUrl = 'http://localhost:3002/api/empleado/type';
  
  private apiUrl2 = 'http://localhost:3002/api/empleado/value';
  
  
  constructor(private http: HttpClient) { }

  private usuario: any[] = [] ;

  postType(user:any[]) {
    console.log("valores: ",user)
    return this.http.post<any[]>(this.apiUrl,user);
  }

  postValue(user:any[]){
    return this.http.post<any[]>(this.apiUrl2,user);
  }

  getUsuario(){
    return this.usuario;
  }
  setUsuario(usuario:any[]){
    this.usuario = usuario;
  }

}
