import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isAuthenticated = this.authService.isAuthenticated();
    
    if (!isAuthenticated) {
      this.router.navigate(['/login']); 
      return false;
      
    }

    // Si el rol necesario está definido en las rutas, lo comprobamos
    const expectedRole = route.data['expectedRole'];
    if (expectedRole && this.authService.getUserRole() !== expectedRole) {
      this.router.navigate(['/login']); 
      return false;
    }

    return true; // Permitir el acceso
  }
}
