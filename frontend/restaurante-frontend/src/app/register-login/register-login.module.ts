import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ IMPORTAR FormsModule
import { RegisterLoginRoutingModule } from './register-login-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  imports: [
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
    CommonModule,
    FormsModule, // ✅ Asegurarse de incluir FormsModule aquí
    RegisterLoginRoutingModule
  ]
})
export class RegisterLoginModule { }
