import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gafa } from '../interface/gafa';
import { AuthService } from '../guard/AuthService';

@Injectable({
    providedIn: 'root'
  })

export class GafaService {

    private apiUrl = 'http://localhost:8090/gafa';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getGafas(): Observable<Gafa[]> {
      const token = this.authService.getToken(); // Obtener el token

      // Crear cabeceras con el token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

        return this.http.get<Gafa[]>(this.apiUrl, { headers });
    }

}