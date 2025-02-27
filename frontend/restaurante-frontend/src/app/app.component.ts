import { Component, HostListener, ViewChild, OnInit, Renderer2, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { DescriptionComponent } from './home/components/description/description.component';
import { FeaturedDishesComponent } from './home/components/featured-dishes/featured-dishes.component';
import { ImgComponent } from './home/components/img/img.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DescriptionComponent, 
    FeaturedDishesComponent, ImgComponent, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showScrollButton = false;

  @ViewChild(ShoppingCartComponent) myComponent!: ShoppingCartComponent;
  @ViewChild('mainHeader', { static: false }) header!: ElementRef;
  @ViewChild('mainFooter', { static: false }) footer!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        const isAuthRoute = event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects.includes('/register');

        if (this.header) {
          this.renderer.setStyle(this.header.nativeElement, 'display', isAuthRoute ? 'none' : 'block');
        }

        if (this.footer) {
          this.renderer.setStyle(this.footer.nativeElement, 'display', isAuthRoute ? 'none' : 'block');
        }
      });
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollButton = window.scrollY > 200;
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  executeSidenav() {
    if (this.myComponent) {
      this.myComponent.ejecutarComando();
    }
  }

  title = 'restaurante-frontend';
}