import { Component, OnInit } from '@angular/core';
import { TableSelectorComponent } from '../../components/table-selector/table-selector.component';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Reserva {
  id: number;
  nombre_cliente: string; // Cambio aquí
  fecha_hora: string; // Cambio aquí
  personas: number; // Cambio aquí
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}


@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  imports: [CommonModule, TableSelectorComponent, ReservationFormComponent]
})
export class ReservationsComponent implements OnInit {
  selectedTableId: number | null = null;
  reservationData: any = null;
  showError = false;
  reservas: Reserva[] = [];
  isAdmin: boolean = true; // Ajustar según autenticación
  apiUrl: string = 'http://127.0.0.1:8000/api/public-reservas/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.http.get<Reserva[]>(this.apiUrl).subscribe(
      (data) => {
        console.log('✅ Reservas obtenidas:', data);
        this.reservas = data;
      },
      (error) => {
        console.error('❌ Error al obtener reservas:', error);
      }
    );
  }

  cancelarReserva(id: number) {
    if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
      this.http.delete(`${this.apiUrl}${id}/`).subscribe(
        () => {
          alert('Reserva cancelada');
          this.obtenerReservas(); // Recargar la lista después de cancelar
        },
        (error) => {
          console.error('❌ Error al cancelar la reserva:', error);
        }
      );
    }
  }

  onFormSubmit(data: any): void {
    this.reservationData = data;
  }

  onTableSelected(tableId: number): void {
    this.selectedTableId = tableId;
  }
}