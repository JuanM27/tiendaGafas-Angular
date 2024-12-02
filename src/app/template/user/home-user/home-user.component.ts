import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GafaService } from '../../../service/gafa.service';
import { Gafa } from '../../../interface/gafa';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CarritoService } from '../../../service/carrito.service';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {

  gafas: Gafa[] = [];
  terminoBusqueda: string = '';
  gafasFiltradas: Gafa[] = [];

  constructor(private gafaService: GafaService, private carritoService:CarritoService) { }

  ngOnInit() {
    this.gafaService.getGafas().subscribe(
      (data: Gafa[]) => {
        console.log("Data:",data) // Mostrar los datos en consola
        this.gafas = data; 
        this.gafasFiltradas = this.gafas;
        console.log(localStorage.getItem('authToken')) // Asignar los datos al array gafas
      },
      (error) => {
        console.error('Error al obtener las gafas', error);  // Manejo de errores
      }
    );
  }

  agregarGafa(gafa: Gafa) {
    this.carritoService.agregarCarrito(gafa);
  }

  recibirTerminoBusqueda(termino: string) {
    this.terminoBusqueda = termino;
    this.gafasFiltradas = this.filtrarGafas();
  }

  filtrarGafas() {
    return this.gafas.filter(gafa => gafa.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
  }

}
