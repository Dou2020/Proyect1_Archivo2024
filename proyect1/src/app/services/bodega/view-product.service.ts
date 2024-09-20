import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {

  private apiUrl = "http://localhost:3002/api/bodega/selectProduct"

  constructor(private http:HttpClient) { }
  
  postProduct(sub:any){
    return this.http.post<any[]>(this.apiUrl,sub);
  }
}
