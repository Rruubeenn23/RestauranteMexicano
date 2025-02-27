import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Reserva {
  id: number;
  nombreCliente: string;
  fecha: string; // Formato YYYY-MM-DD
  hora: string;  // Formato HH:mm
  cantidadPersonas: number;
  estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la app
})
export class ReservationService {
  private apiUrl = 'http://127.0.0.1:8000/api/public-reservas/'; // Cambia por tu endpoint real

  constructor(private http: HttpClient) {}

  createReservation(reservationData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = {
      mesa: reservationData.mesa,                    // Nombre de la mesa
      nombre_cliente: reservationData.nombre_cliente, // Nombre del cliente
      personas: reservationData.people,
      fecha_hora: `${reservationData.date}T${reservationData.time}:00Z`
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('http://127.0.0.1:8000/public/public-reservas/');
  }
  
  
  crearReserva(reserva: Reserva): Observable<Reserva> {
    const token = localStorage.getItem('token');  // ✅ Obtener token del usuario
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    return this.http.post<Reserva>(this.apiUrl, reserva, { headers });
  }
  
  // Actualizar el estado de una reserva
  actualizarReserva(id: number, data: Partial<Reserva>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }
  cancelarReserva(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { estado: 'Cancelada' });
  }
  
  // Eliminar una reserva
  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}