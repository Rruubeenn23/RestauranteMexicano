import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  reservationForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private reservationService: ReservationService) {
    this.reservationForm = this.fb.group({
      mesa: ['', Validators.required],
      nombre_cliente: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe({
        next: () => {
          this.successMessage = 'Reserva guardada con éxito';
          this.errorMessage = '';
          this.reservationForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Error al guardar la reserva';
          console.error('Error al guardar la reserva', err);
        }
      });
    } else {
      this.reservationForm.markAllAsTouched();
    }
  }
}
