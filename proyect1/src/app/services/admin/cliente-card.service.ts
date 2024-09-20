import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClienteCardService {

  private apiUrl = 'http://localhost:3002/api/admin/userCard';

  constructor(private http: HttpClient) { }

  
  getClientCard(){
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
