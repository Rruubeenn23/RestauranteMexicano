import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItemsComponent } from '../../components/menu-items/menu-items.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css'],
  imports: [RouterOutlet, MenuItemsComponent]
})
export class CartaComponent { }
