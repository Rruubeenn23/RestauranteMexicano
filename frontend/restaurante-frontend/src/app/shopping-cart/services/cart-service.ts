import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MenuItem {
  nombre: string;
  precio: number;
  alergenos: string[];
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<MenuItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(item: MenuItem) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(cartItem => cartItem.nombre === item.nombre);
  
    if (existingItem) {
      existingItem.cantidad += 1;
    } else {
      this.cartItems.next([...currentItems, { ...item, cantidad: item.cantidad || 1 }]);
      return;
    }
  
    this.cartItems.next([...currentItems]);
  }
  

  increaseQuantity(index: number) {
    const currentItems = this.cartItems.getValue();
    currentItems[index].cantidad += 1;
    this.cartItems.next([...currentItems]);
  }

  decreaseQuantity(index: number) {
    const currentItems = this.cartItems.getValue();
    if (currentItems[index].cantidad > 1) {
      currentItems[index].cantidad -= 1;
    } else {
      this.removeFromCart(index);
      return;
    }
    this.cartItems.next([...currentItems]);
  }

  removeFromCart(index: number) {
    const currentItems = this.cartItems.getValue();
    currentItems.splice(index, 1);
    this.cartItems.next([...currentItems]);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getCartItems() {
    return this.cartItems.getValue();
  }

  
}