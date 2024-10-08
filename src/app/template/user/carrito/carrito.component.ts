import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../service/carrito.service';
import { Carrito } from '../../../interface/carrito';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{

  constructor(private carritoService:CarritoService) {}

  listCarrito: Carrito[] = [];

  ngOnInit() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  totalCarrito() {
    return this.carritoService.total();
  }

  eliminarGafa(index: number) {
    this.carritoService.eliminarGafa(index);
    this.getListCarrito();
  }

  onKeyDown(event: any) {
    event.preventDefault();
  }

  actualizar(item:Carrito, index:number) {
    this.carritoService.actualizarCarrito(index, item.cantidad);
  }

}
