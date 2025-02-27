import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component';
import { TableSelectionComponent } from '../../components/table-section/table-section.component';
import { ReservationService } from '../../services/reservation.service';

interface Reserva {
  id: number;
  nombreCliente: string;
  fecha: string;
  hora: string;
  cantidadPersonas: number;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}

@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent, TableSelectionComponent],
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  selectedTableId: number | null = null;
  reservationData: any = null;
  showError = false;
  reservas: Reserva[] = [];
  isAdmin: boolean = true; // Cambia esto según tu lógica de autenticación

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservationService.getReservas().subscribe((data: Reserva[]) => {
      this.reservas = data;
    }, error => {
      console.error('Error al obtener reservas:', error);
    });
  }

  cancelarReserva(id: number) {
    if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
      this.reservationService.cancelarReserva(id).subscribe(() => {
        alert('Reserva cancelada');
        this.obtenerReservas(); // Recargar la lista después de cancelar
      }, error => {
        console.error('Error al cancelar la reserva:', error);
      });
    }
  }

  onFormSubmit(data: any): void {
    this.reservationData = data;
  }

  onTableSelected(tableId: number): void {
    this.selectedTableId = tableId;
  }

  showSummary(): void {
    if (this.reservationData && this.selectedTableId) {
      alert(
        `Reserva confirmada para ${this.reservationData.name} en la mesa ${this.selectedTableId}`
      );
      this.showError = false;
    } else {
      this.showError = true;
    }
  }
}
