import { Component } from '@angular/core';
import { DescriptionComponent } from '../../components/description/description.component';
import { FeaturedDishesComponent } from '../../components/featured-dishes/featured-dishes.component';
import { ImgComponent } from '../../components/img/img.component';
@Component({
  selector: 'app-home',
  imports: [DescriptionComponent, FeaturedDishesComponent, ImgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
