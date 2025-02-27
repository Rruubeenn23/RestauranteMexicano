import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'], 
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AuthFormComponent {
  @Input() isRegisterMode: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();

  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  direccion?: string;
  rol?: string = "usuario"

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (this.isRegisterMode) {
      if (!this.name || !this.phone || !this.email || !this.password || !this.confirmPassword) {
        alert('Por favor, completa todos los campos');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const userData = {
        nombre: this.name,
        email: this.email,
        numero_telefono: this.phone,
        password: this.password,
        direccion: this.direccion || "",  // Valor por defecto si no está definido
        rol: "usuario"  // Valor por defecto
      };
      
      

      this.authService.register(userData).subscribe(response => {
        this.authService.saveUserData(response);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error en registro', error);
      });

    } else {
      if (!this.email || !this.password) {
        alert('Por favor, ingresa tu email y contraseña');
        return;
      }

      const credentials = {
        email: this.email,
        password: this.password
      };

      this.authService.login(credentials).subscribe(response => {
        this.authService.saveUserData(response);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error en login', error);
      });
    }
  }
}
