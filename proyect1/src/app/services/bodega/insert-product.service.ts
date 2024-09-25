import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsertProductService {
  
  private apiUrl = "http://localhost:3002/api/bodega/insertProduct"

  constructor(private http:HttpClient) {   }

  insertProductPost(value:any){
    return this.http.post<any[]>(this.apiUrl,value);
  } 
}
