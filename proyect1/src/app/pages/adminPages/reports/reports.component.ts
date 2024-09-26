import { Component, OnInit } from '@angular/core';
import { ReportVentasService } from '../../../services/admin/report-ventas.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{


  topVentas: any[] = [];
  topSubcursales: any[] = [];
  topArticulos: any[] = [];
  topClientes: any[] = [];

  constructor(private reports: ReportVentasService ){}

  
  ngOnInit(): void {
      this.getTopVentas();
      this.getTopSubcursales();
      this.getTopArticulos();
      this.getTopClientes();
  }

  getTopVentas(){
    this.reports.topVentasGet().subscribe({
      next:(value)=>{
        this.topVentas = value;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  getTopSubcursales(){
    this.reports.topSubcursalGet().subscribe({
      next:(value)=>{
        this.topSubcursales = value;
      }, error(err){
        console.log(err);
      }
    })
  }

  getTopArticulos(){
    this.reports.topArticulosGet().subscribe({
      next:(value)=>{
        this.topArticulos = value;
      }, error(err){
        console.log(err);
      }
    })
  }

  getTopClientes(){
    this.reports.topClientesGet().subscribe({
      next:(value)=>{
        this.topClientes = value;
      },error:(err)=>{
        console.error;
      }
    })
  }


}
