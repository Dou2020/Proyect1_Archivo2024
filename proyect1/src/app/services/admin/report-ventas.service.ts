import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportVentasService {

  constructor(private http:HttpClient) { }

  private Url = "http://localhost:3002/api/report/topVentas";
  private Url2 = "http://localhost:3002/api/report/topSubcursal";
  private Url3 = "http://localhost:3002/api/report/topArticulos";
  private Url4 = "http://localhost:3002/api/report/topClientes";

  topVentasGet(){
    return this.http.get<any[]>(this.Url);
  }
  topSubcursalGet(){
    return this.http.get<any[]>(this.Url2);
  }
  topArticulosGet(){
    return this.http.get<any[]>(this.Url3);
  }
  topClientesGet(){
    return this.http.get<any[]>(this.Url4);
  }
}
