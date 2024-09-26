import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsertFacturaService {

  private apiUrl = "http://localhost:3002/api/cajero/InsertFacturaInit";
  private apiUrl2 = "http://localhost:3002/api/cajero/InsertProductFactura";
  private apiUrl3 = "http://localhost:3002/api/cajero/viewProductFactura"

  constructor(private http:HttpClient) {   }

  insertFacturaPost(value:any){
    return this.http.post<any[]>(this.apiUrl,value);
  }

  insertProductFacPost(value:any){
    return this.http.post<any[]>(this.apiUrl2,value);
  }

  viewProductFacPost(value:any){
    return this.http.post<any[]>(this.apiUrl3,value);
  }
}
