import {Gafa} from './gafa';

export class Carrito {
    gafa: Gafa;
    cantidad: number;

    constructor(gafa: Gafa, cantidad: number = 1) {
        this.gafa = gafa;
        this.cantidad = cantidad;
    }
}