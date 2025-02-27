import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { TableSelectorComponent } from './components/table-selector/table-selector.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,  
    OrdersComponent,      
    ReservationsComponent, 
    TableSelectorComponent, 
    ReservationFormComponent,
    HttpClientModule
  ]
})
export class AdminModule { }
