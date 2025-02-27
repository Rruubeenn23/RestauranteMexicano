import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios/users/';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    })
  };

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions);
  }

  getCliente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, this.httpOptions);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, this.httpOptions);
  }
}
