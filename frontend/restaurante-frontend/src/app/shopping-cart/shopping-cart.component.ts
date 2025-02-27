import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from './services/cart-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, MatButtonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  reason = '';
  shouldRun = false;
  cartItems: any[] = [];
  apiUrl = 'http://localhost:8000/api'; // URL base de la API
  apiUrl2 = 'http://localhost:8000/public'; // Otra URL de la API pública

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    public cartService: CartService,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }
  

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  ejecutarComando() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    console.log('✅ Sidenav abierto correctamente');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).shoppingCartComponent = this;
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(address => {
      if (address) {
        this.checkout(address);
      }
    });
  }

  checkout(address: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Debes iniciar sesión para realizar un pedido');
      return;
    }
  
    const pedido = {
      fecha_hora: new Date().toISOString(),
      total: this.getTotal(),
      estado: "entregado",
      direccion_envio: address,
      cliente: user.id
    };
  
    // Enviar el pedido a la API REST
    this.http.post(`${this.apiUrl}/pedidos/`, pedido).subscribe(
      (pedidoResponse: any) => {
        console.log('✅ Pedido creado:', pedidoResponse);
  
        // Enviar cada producto como un detalle del pedido
        this.cartItems.forEach(item => {
          if (!item.id) {
            console.error('❌ Error: El item no tiene un ID válido:', item);
            return;
          }
  
          const detalle = {
            order: pedidoResponse.id,
            plato: item.id,  // ✅ Ahora enviamos el ID del plato, NO el nombre
            cantidad: item.cantidad,
            precio_unitario: item.precio,
            total: item.cantidad * item.precio  // ✅ Total calculado
          };
  
          console.log("📌 Enviando detalle corregido:", JSON.stringify(detalle, null, 2));
  
          this.http.post(`${this.apiUrl2}/order-details/`, detalle).subscribe(
            detalleResponse => console.log('✅ Detalle guardado:', detalleResponse),
            error => console.error('❌ Error al guardar detalle:', error)
          );
        });
  
        alert('Pedido realizado con éxito');
        this.cartService.clearCart();  // Vaciar carrito después de hacer el pedido
      },
      error => console.error('❌ Error al crear pedido:', error)
    );
  }
  
}

// ✅ AddressDialogComponent corregido y sin duplicados
@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="dialog-container">
      <h2 class="dialog-title">Introduce tu dirección</h2>
      <input [(ngModel)]="address" placeholder="Escribe tu dirección aquí" class="dialog-input"/>
      <div class="dialog-actions">
        <button mat-button class="dialog-cancel" (click)="dialogRef.close()">Cancelar</button>
        <button mat-button class="dialog-confirm" (click)="confirm()">Confirmar</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .dialog-title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }

    .dialog-input {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 2px solid #ccc;
      border-radius: 5px;
      transition: all 0.3s;
    }

    .dialog-input:focus {
      border-color: #007BFF;
      outline: none;
    }

    .dialog-actions {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 15px;
    }

    .dialog-cancel, .dialog-confirm {
      flex: 1;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      border: none;
      text-align: center;
      font-weight: bold;
    }

    .dialog-cancel {
      background: #ccc;
      color: #333;
      margin-right: 10px;
    }

    .dialog-confirm {
      background: #007BFF;
      color: #fff;
    }

    .dialog-confirm:hover {
      background: #0056b3;
    }

    .dialog-cancel:hover {
      background: #b3b3b3;
    }
  `]
})
export class AddressDialogComponent {
  address: string = '';

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>) {}

  confirm(): void {
    this.dialogRef.close(this.address);
  }
}
