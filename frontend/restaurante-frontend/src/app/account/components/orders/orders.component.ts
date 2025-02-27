import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  imports: [CommonModule],
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrderId: number | null = null;
  orderDetails: any[] = [];
  user: any = {}; // Almacena el usuario autenticado

  constructor(private accountService: AccountService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserAndOrders();
  }

  loadUserAndOrders() {
    this.accountService.getUser().subscribe(userData => {
      this.user = userData;

      // Ahora obtenemos los pedidos del usuario autenticado
      this.accountService.getUserOrders(this.user.id).subscribe(data => {
        this.orders = data;
        this.cdr.detectChanges();
    });    
    });
  }

  toggleDetalles(orderId: number) {
    if (this.selectedOrderId === orderId) {
      this.selectedOrderId = null;
      this.orderDetails = [];
    } else {
      this.selectedOrderId = orderId;
      this.loadOrderDetails(orderId);
    }
    this.cdr.detectChanges();
  }

  loadOrderDetails(orderId: number) {
    this.accountService.getOrderDetails(orderId).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.orderDetails = data.map(detail => ({
            ...detail,
            plato_nombre: detail.plato_nombre || 'Plato desconocido'  // ✅ Evita valores nulos
          }));
        } else {
          this.orderDetails = [{
            ...data,
            plato_nombre: data.plato_nombre || 'Plato desconocido'
          }];
        }
        console.log('✅ Detalles del pedido cargados:', this.orderDetails);
        this.cdr.detectChanges();
      },
      error => console.error('❌ Error al cargar detalles del pedido:', error)
    );
  }
  
}
