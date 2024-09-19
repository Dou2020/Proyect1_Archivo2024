import { Routes } from '@angular/router';

import { InicioComponent } from "./inicio/inicio.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { BodegaComponent } from "./pages/bodega/bodega.component";
import { CajeroComponent } from "./pages/cajero/cajero.component";
import { InvenComponent } from "./pages/inven/inven.component";

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'admin',component:AdminComponent},
    {path:'bodega',component:BodegaComponent},
    {path:'cajero',component:CajeroComponent},
    {path:'inven',component:InvenComponent},
];
  