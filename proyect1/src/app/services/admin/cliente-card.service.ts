import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClienteCardService {

  private apiUrl = 'http://localhost:3002/api/admin/userCard';
  private apiUrl2 = 'http://localhost:3002/api/admin/updateCard';
  

  constructor(private http: HttpClient) { }

  
  getClientCard(){
    return this.http.get<any[]>(this.apiUrl);
  }
  
  postUpdateTypeCard(value: any){
    return this.http.post<any[]>(this.apiUrl2,value);
  }
  
}
