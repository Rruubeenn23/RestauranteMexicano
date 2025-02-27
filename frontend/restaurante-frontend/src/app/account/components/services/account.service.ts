import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiBaseUrl = 'http://localhost:8000/api';
  private apiBaseUrl2 = 'http://localhost:8000/';
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Obtener usuario autenticado desde localStorage
  getUser(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return of(user ? JSON.parse(user) : null);
    }
    return of(null);
  }

  // Método para obtener headers con token de autenticación
  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');  // Solo se accede a localStorage en el navegador
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Token ${token}` : ''
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Obtener pedidos del usuario autenticado
  getUserOrders(userId: number): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiBaseUrl2}/public/pedidos/${userId}/`);
  }

  // Obtener detalles de un pedido específico
  getOrderDetails(orderId: number) {
    return this.http.get(`${this.apiUrl}/public/order-details/${orderId}/`);
  }

  // 🔥🔥 Método de logout 🔥🔥
  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`http://localhost:8000/api/usuarios/logout/`, {}, { headers });
  }
  
}
