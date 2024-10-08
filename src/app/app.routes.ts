import { Routes } from '@angular/router';
import { LoginComponent } from './template/login/login.component';
import {HomeUserComponent} from './template/user/home-user/home-user.component';
import { CarritoComponent } from './template/user/carrito/carrito.component';
import { AuthGuard } from './guard/AuthGuard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path:'user/home', component: HomeUserComponent, canActivate: [AuthGuard], data: { expectedRole: 'USER' } },
    {path: 'user/carrito', component: CarritoComponent, canActivate: [AuthGuard], data: { expectedRole: 'USER' } },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
    
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
    //{ path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } },
];
