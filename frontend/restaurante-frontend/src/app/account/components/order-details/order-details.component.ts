import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface OrderDetail {
  orderId: number;
  plato: string;
  plato_nombre: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports: [CommonModule]
})
export class OrderDetailsComponent implements OnChanges {
  @Input() orderId: number | null = null;

  orderDetails: OrderDetail[] = [];

  filteredDetails: OrderDetail[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderId'] && this.orderId !== null) {
      console.log("Filtrando detalles para el orderId:", this.orderId);
      this.updateDetails();
    }
  }

  updateDetails() {
    this.filteredDetails = this.orderDetails.filter(detail => detail.orderId === this.orderId);
    console.log("Detalles filtrados:", this.filteredDetails);
  }
}