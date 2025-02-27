import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // ✅ Importar CommonModule para usar *ngFor
import { ClienteService } from '../../services/services.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [CommonModule] // ✅ Asegurar que CommonModule está importado
})
export class ClientComponent implements OnInit {
  clientes: any[] = [];

  constructor(private http: HttpClient, private clienteService: ClienteService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(
      data => {
        console.log("✅ Clientes recibidos:", data);
        this.clientes = data;
      },
      error => console.error("❌ Error al obtener clientes:", error)
    );
  }

  eliminarCliente(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => {
        alert('Cliente eliminado correctamente');
        this.cargarClientes();
      });
    }
  }
}
