import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

@Injectable({
  providedIn: 'root'
})
export class SelectBodegaService {

  private apiUrl = 'http://localhost:3002/api/admin/userCard';
  
  constructor(private http: HttpClient) { }


  getData() {
    return this.http.get<any[]>(this.apiUrl);
  }

}
