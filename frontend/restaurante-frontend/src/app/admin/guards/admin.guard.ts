import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../register-login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isGerente = this.authService.isGerente();
    console.log("🔍 Intento de acceso al Admin - ¿Es gerente?:", isGerente);  // 🔥 Depuración
  
    if (isGerente) {
      return true;
    } else {
      alert('Acceso denegado. No tienes permisos para acceder a esta página.');
      this.router.navigate(['/home']); // Redirigir a home si no es gerente
      return false;
    }
  }
}  