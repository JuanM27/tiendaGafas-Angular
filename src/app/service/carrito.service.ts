import  { Injectable } from '@angular/core';
import { Carrito } from '../interface/carrito';
import { Gafa } from '../interface/gafa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../guard/AuthService';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

    private listCarrito: Carrito[] = [];
    private apiUrl = 'http://localhost:8090/pedidos';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getCarrito() {

        this.obtenerSession();

        return this.listCarrito;
    }

    agregarCarrito(gafa: Gafa, cantidad: number = 1) {

        this.obtenerSession();

        const index = this.listCarrito.findIndex((carrito) => carrito.gafa.idGafa === gafa.idGafa);
        if (index === -1) {
            this.listCarrito.push(new Carrito(gafa, cantidad));
            console.log("Agregado al carrito");
            console.log(this.listCarrito);
        } else {
            this.actualizarCarrito(index, this.listCarrito[index].cantidad + cantidad);
        }

        this.guardarSession();
    }

    actualizarCarrito(index: number, cantidad: number) {
        if(index>=0 && index< this.listCarrito.length){
            this.listCarrito[index].cantidad = cantidad;
            this.guardarSession();
        }
    }

    cantidadCarrito() {
        this.obtenerSession();
        return this.listCarrito.length;
    }

    total(){
        const total = this.listCarrito.reduce((sum, objeto) => 
            sum + objeto.gafa.precio * objeto.cantidad, 0);
        
        return total;
    }

    eliminarGafa(index: number) {
        if(index>=0 && index< this.listCarrito.length){
            this.listCarrito.splice(index, 1);
            this.guardarSession();
        }
    }

    guardarSession(){
        localStorage.setItem('carrito', JSON.stringify(this.listCarrito));
    }

    obtenerSession(){
        if(typeof window !== 'undefined' && window.localStorage){
            if(localStorage.getItem('carrito')){
                const carrito = localStorage.getItem('carrito');
                if(carrito !== null){
                    this.listCarrito = JSON.parse(carrito);
                }
            }
        }
    }

    limpiarCarrito() {
        this.listCarrito = [];
        localStorage.removeItem('carrito');
    }

    finalizarCompra() {
        const token = this.authService.getToken(); // Obtener el token

      // Crear cabeceras con el token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      console.log(this.listCarrito);
      
        this.http.post(this.apiUrl, this.listCarrito, {headers}).subscribe(
            (response) => {
                
                console.log(response);
                this.limpiarCarrito();
            },
            (error) => {
                console.log(error);
            }
        );
    }

}