import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CarritoService } from '../../service/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @Output() palabraBusqueda: EventEmitter<string>;

  constructor(private carritoService:CarritoService, private router:Router){
    this.palabraBusqueda = new EventEmitter();
  }

  cantidadCarrito(){
    return this.carritoService.cantidadCarrito();
  }

  enviarTerminoBusqueda(termino:string){
    this.palabraBusqueda.emit(termino);
  }

  cerrarSesion(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);

  }
}
