import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, AuthFormComponent]
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegister(data: { name: string, email: string, phone: string, password: string }) {
    const userData = {
      nombre: data.name,  // 🔥 Cambia "name" a "nombre"
      email: data.email,
      numero_telefono: data.phone,  // 🔥 Cambia "phone" a "numero_telefono"
      password: data.password
    };
  
    this.authService.register(userData).subscribe(
      response => {
        alert('Registro exitoso, ahora puedes iniciar sesión');
        this.router.navigate(['/login']); // Redirigir tras registro
      },
      error => {
        console.error('Error en el registro:', error);
        alert('Error al registrar usuario');
      }
    );
  }
}  