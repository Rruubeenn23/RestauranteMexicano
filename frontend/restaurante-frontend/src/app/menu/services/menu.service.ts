import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface MenuItem {
  id?: number;
  nombre: string;
  nickname: string;
  descripcion: string;
  precio: number;
  alergenos: string[];  // ✅ Ahora `alergenos` es siempre un array
  imagen: string;
  cantidad: number;
  categoria: number;
}


export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://127.0.0.1:8000/'; // 🔥 Asegura que sea la ruta correcta

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todos los platos
  getPlatos(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}platos/`);
  }

  // 🔹 Obtener un solo plato
  getPlato(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}platos/${id}/`);
  }

  // 🔹 Crear un plato nuevo
  createPlato(plato: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.apiUrl}platos/`, plato, this.httpOptions);
  }

  // 🔹 Editar un plato existente
  updatePlato(id: number, plato: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}platos/${id}/`, plato, this.httpOptions);
  }

  // 🔹 Eliminar un plato
  deletePlato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}platos/${id}/`, this.httpOptions);
  }

  // 🔹 Obtener platos por categoría
  getPlatosPorCategoria(categoriaId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}platos/categoria/${categoriaId}/`);
  }  
  

  // 🔹 Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}categorias/`);
  }
}
