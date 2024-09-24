import { Routes } from '@angular/router';

import { InicioComponent } from "./inicio/inicio.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { BodegaComponent } from "./pages/bodega/bodega.component";
import { CajeroComponent } from "./pages/cajero/cajero.component";
import { InvenComponent } from "./pages/inven/inven.component";
import { ProductDetailComponent } from './pages/bodegaPages/product-detail/product-detail.component';
import { CreateEmpleadoComponent } from './pages/adminPages/create-empleado/create-empleado.component';
import { ViewUserComponent } from './pages/adminPages/view-user/view-user.component';
import { ViewCardsComponent } from './pages/adminPages/view-cards/view-cards.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},

    // Route of the Administrador
    {path:'admin',component:AdminComponent},
    {path: 'admin/viewUsers',component: AdminComponent},
    {path:'admin/addUser',component:CreateEmpleadoComponent},
    {path:'admin/viewCard',component:ViewCardsComponent},
    {path: 'admin/insertUser',component:ViewUserComponent},  // form of the insert Employee
    {path: 'admin/updateUser/:usuario',component:ViewUserComponent}, // form of the update Employee

    // Route of the bodega
    {path:'bodega',component:BodegaComponent},
    {path:'bodega/viewProduct', component:BodegaComponent},
    {path:'bodega/addProduct', component:ProductDetailComponent},
    {path:'bodega/productDetail/:codProduct', component:ProductDetailComponent}, // form of the update product

    // Route of the  Cajero
    {path:'cajero',component:CajeroComponent},

    // Route of the Inventario
    {path:'inven',component:InvenComponent},
];
  