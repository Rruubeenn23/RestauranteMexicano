import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios/';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Registro de usuario
  register(userData: { nombre: string, email: string, numero_telefono: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData, this.httpOptions)
      .pipe(catchError(error => { throw error; }));
  }
  
  
  
 // login 
 login(credentials: { email: string, password: string }): Observable<any> {
  console.log("🔍 Enviando datos de login:", credentials);  // 🔥 Depuración
  return this.http.post(`${this.apiUrl}login/`, credentials, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(catchError(error => { throw error; }));
}

  
  
  // Guardar datos del usuario autenticado
  saveUserData(user: any) {
    if (user && user.token) {
      console.log("🔍 Guardando usuario en localStorage:", user);  // 🔥 Depuración
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user)); // 🔥 Debe incluir `rol`
    }
  }

  // Obtener el usuario autenticado
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Obtener el token de autenticación
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  // Verificar si el usuario es "gerente"
  isGerente(): boolean {
    const user = this.getUser();
    console.log("🔍 Usuario autenticado:", user);  // 🔥 Depuración
    return user && user.rol && user.rol.toLowerCase() === 'gerente'; // 🔥 Comparación en minúsculas
  }
  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error("❌ No hay token disponible para obtener el usuario");
      return new Observable(observer => observer.error("No hay token disponible"));
    }
  
    return this.http.get(`${this.apiUrl}me/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    }).pipe(
      catchError(error => {
        console.error("❌ Error al obtener el usuario:", error);
        throw error;
      })
    );
  }
  

}
