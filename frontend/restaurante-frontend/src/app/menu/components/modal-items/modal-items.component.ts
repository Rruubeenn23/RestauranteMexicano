import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../shopping-cart/services/cart-service';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../../register-login/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id?: number;
  nombre: string;
  nickname: string;
  descripcion: string;
  precio: number;
  alergenos: string[];
  imagen: string;
  cantidad: number;
  categoria: number;
}

@Component({
  selector: 'app-modal-items',
  templateUrl: './modal-items.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./modal-items.component.css']
})
export class ModalItemsComponent {
  @Input() item!: MenuItem;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() itemUpdated = new EventEmitter<MenuItem>();
  @Output() itemDeleted = new EventEmitter<number>();

  isAdmin: boolean = false;
  alergenosText: string = '';
  constructor(private cartService: CartService, private menuService: MenuService, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isGerente();
  
    if (!this.item.alergenos) {
      this.item.alergenos = [];
    }
  
    // Convertir array de alérgenos a texto separado por comas para mostrar en el input
    this.alergenosText = this.item.alergenos.join(', ');
  }

  addToCart() {
    this.cartService.addToCart(this.item);
    this.close.emit();
  }

  saveChanges() {
    if (this.item.id) {
      const updatedItem: MenuItem = {
        ...this.item,
        alergenos: Array.isArray(this.item.alergenos) ? [...this.item.alergenos] : [] // Asegurar que alergenos es un array
      };
      
      this.menuService.updatePlato(this.item.id, updatedItem).subscribe(() => {
        alert('Plato actualizado con éxito');
        this.itemUpdated.emit(this.item);
        this.close.emit();
      }, error => {
        console.error('Error al actualizar el plato:', error);
      });
    }
  }

  deleteItem() {
    if (this.item.id && confirm('¿Seguro que deseas eliminar este plato?')) {
      this.menuService.deletePlato(this.item.id).subscribe(() => {
        alert('Plato eliminado');
        this.itemDeleted.emit(this.item.id);
        this.close.emit();
      }, error => {
        console.error('Error al eliminar plato:', error);
      });
    }
  }
  updateAlergenos() {
    this.item.alergenos = this.alergenosText.split(',').map(alergeno => alergeno.trim());
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  
  getAlergenosText(alergenos: string | string[]): string {
    if (Array.isArray(alergenos)) {
      return alergenos.join(', '); // Si es un array, lo unimos con comas
    }
    return alergenos.trim(); // Si es un string, aplicamos trim
  }
}