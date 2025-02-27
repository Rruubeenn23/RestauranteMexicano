import { Component } from '@angular/core';
import { AccountScreenComponent } from "../../components/account-screen/account-screen.component";
import { OrdersComponent } from '../../components/orders/orders.component'; 

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  imports: [AccountScreenComponent, OrdersComponent]
})
export class AccountPageComponent {
  user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com'
  };
}
