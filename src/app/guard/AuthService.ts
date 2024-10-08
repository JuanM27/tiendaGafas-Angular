import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // Asegúrate de que esto esté aquí
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/auth/login'; // URL de tu backend
  

  constructor(private http: HttpClient) {
    console.log("AuthService initialized");
  }

  // Método de login que guarda el token en localStorage
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { correo, contrasena }).pipe(
      tap(response => {
        this.setToken(response.token);
        const decodedToken: any = jwtDecode(response.token);

      })
    );
  }

  // Guardar el token en localStorage
  setToken(token: string): void { 
    localStorage.setItem('authToken', token);
  }

  // Obtener el token de localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') { // Verifica si está en el navegador
      return localStorage.getItem('authToken');
    }
    return null; // O manejarlo de otra forma si estás en el servidor

  }

  // Obtener el rol del usuario decodificando el token
  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles[0];  // Retornar el primer rol como ejemplo
    }
    return null;
  }
  
  // Método para cerrar sesión y eliminar el token
  logout(): void {
    localStorage.removeItem('authToken');
  }
  
  // Verificar si el usuario está autenticado (si existe un token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
