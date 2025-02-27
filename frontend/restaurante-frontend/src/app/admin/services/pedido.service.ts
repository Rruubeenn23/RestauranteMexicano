import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { catchError } from 'rxjs/operators'; // ✅ Importar catchError


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://127.0.0.1:8000/pedidos/';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}` // Autenticación con Token
    })
  };

  // 🔹 Obtener todos los pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl, this.httpOptions);
  }
  
  // 🔹 Cancelar un pedido
  cancelarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, this.httpOptions);
  }
}
