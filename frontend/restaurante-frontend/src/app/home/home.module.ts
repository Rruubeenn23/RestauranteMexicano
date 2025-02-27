import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DescriptionComponent } from './components/description/description.component';
import { FeaturedDishesComponent } from './components/featured-dishes/featured-dishes.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent,  // ✅ Agregar HomeComponent
    DescriptionComponent,
    FeaturedDishesComponent
  ]
})
export class HomeModule { }
