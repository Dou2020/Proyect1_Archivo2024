import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewClientService {
  
  apiUrl = "http://localhost:3002/api/cajero/viewClient";
  
  constructor(private http:HttpClient) {


   }

   postClientView(value: any){
    return this.http.post<any[]>(this.apiUrl,value)  
   }

}
