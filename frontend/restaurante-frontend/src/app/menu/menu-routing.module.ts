import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { ModalItemsComponent } from './components/modal-items/modal-items.component';

const routes: Routes = [
  { path: 'menu-items', component: MenuItemsComponent },
  { path: 'modal-items', component: ModalItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
