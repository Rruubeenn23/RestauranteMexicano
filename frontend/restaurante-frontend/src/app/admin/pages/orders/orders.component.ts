import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // 🔥 Importación de módulo HTTP

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  imports: [CommonModule, HttpClientModule],  // ✅ Asegurar que HttpClientModule está aquí
  standalone: true,
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private http: HttpClient) {}  

  ngOnInit(): void {
    this.cargarPedidos();
  }

  /**
   * Obtiene la información de un cliente desde la API.
   */
  getCliente(id: number): Observable<any> {
    console.log(`🔍 Solicitando datos del cliente con ID: ${id}`);
    return this.http.get(`http://127.0.0.1:8000/api/usuarios/users/${id}/`)  // ✅ Asegurar que esta URL existe en Django
      .pipe(catchError(error => { 
        console.error(`❌ Error al obtener cliente ${id}:`, error);
        throw error; 
      }));
  }

  /**
   * Carga los pedidos desde la API y obtiene información de los clientes asociados.
   */
  cargarPedidos() {
    this.pedidoService.getPedidos().subscribe(
      pedidos => {
        console.log("✅ Pedidos recibidos desde la API:", pedidos);
        
        // Iteramos sobre los pedidos y cargamos los datos de los clientes
        pedidos.forEach(pedido => {
          if (pedido.cliente) {
            this.getCliente(pedido.cliente).subscribe(
              clienteData => {
                console.log(`✅ Cliente recibido: ${clienteData.nombre}`);
                pedido.clienteNombre = clienteData.nombre;  // ✅ Agregar el nombre del cliente
              },
              error => {
                console.error("❌ Error al obtener cliente:", error);
                pedido.clienteNombre = "Desconocido";  // Fallback en caso de error
              }
            );
          }
        });

        this.pedidos = pedidos;
      },
      error => console.error("❌ Error al obtener pedidos:", error)
    );
  }
  /**
   * Cancela un pedido y actualiza la lista.
   */
  cancelarPedido(id: number): void { 
    if (confirm('¿Estás seguro de cancelar este pedido?')) {
      this.pedidoService.cancelarPedido(id).subscribe(
        () => {
          alert('✅ Pedido cancelado correctamente');
          this.cargarPedidos();  // ✅ Recargar la lista después de cancelar
        },
        error => {
          console.error("❌ Error al cancelar el pedido:", error);
          alert('❌ Hubo un error al cancelar el pedido');
        }
      );
    }
  }
}
