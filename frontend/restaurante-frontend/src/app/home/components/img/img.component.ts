import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img',
  imports: [CommonModule],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent {
  currentIndex = 0;

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : 3; 
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < 3) ? this.currentIndex + 1 : 0;
  }
}
