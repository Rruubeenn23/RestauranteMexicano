import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-dishes',
  imports: [CommonModule],
  templateUrl: './featured-dishes.component.html',
  styleUrls: ['./featured-dishes.component.css']
})
export class FeaturedDishesComponent {
  menu = [
    {
      categoria: 'Destacados',
      items: [
        {
          nombre: "Guacamole casero con totopos",
          precio: 9.80,
          alergenos: ["Ninguno"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/06/Guacamole-casero-con-totopos.webp"
        },
        {
          nombre: "Enchilada de cochinita pibil con salsa baja-med",
          precio: 11.30,
          alergenos: ["Gluten y Lácteos"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/12/Enchilada-de-cochinita-pibil-con-salsa-baja-med.webp"
        },
        {
          nombre: "Chilaquiles rojos con salsa molcajeteada de chiles güeros y huevo frito",
          precio: 11,
          alergenos: ["Gluten, Huevos y Lácteos"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/06/Chilaquiles-rojos-con-salsa-molcajeteada-de-chiles-gueros-y-huevo-frito.webp"
        },
        {
          nombre: "Quesadilla de pastrami y queso raclette en pan árabe con salsa tártara de jalapeño",
          precio: 11,
          alergenos: ["Gluten, Huevos y Lácteos"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2024/10/Quesadilla-de-pastrami-y-queso-raclette-en-pan-arabe-tostado-con-salsa-tartara-de-jalapeno.webp"
        },
        {
          nombre: "Quesadilla de rabo de toro guisado con chiles, queso Gamoneu y salsa molcajeteada",
          precio: 11.10,
          alergenos: ["Gluten, Apio y Lácteos"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/06/Quesadilla-de-rabo-de-Toro-guisado-con-tres-chiles-queso-Gamoneu-y-salsa-molcajeteada-de-chiles-Gueros.webp"
        },
        {
          nombre: "Taco de mollejas de Ternera salteadas con mojo de ajo y chile de arbol",
          precio: 11.50,
          alergenos: ["Gluten"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2024/07/Taco-de-mollejas-de-Ternera-salteadas-con-mojo-de-ajo-y-chile-de-arbol.webp"
        },
        {
          nombre: "Tacos de brisket de wagyu con crema de elote y tajín de dos chiles",
          precio: 12.40,
          alergenos: ["Lácteos y Mostaza"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/06/Tacos-de-brisket-de-wagyu-con-crema-de-elote-y-tajin-de-dos-chiles.webp"
        },
        {
          nombre: "Tacos de Presa ibérica con sobrasada, salsa borracha y queso Cotija mexicano",
          precio: 12.80,
          alergenos: ["Gluten, Dióxido de azufre y sulfitos y Lácteos"],
          imagen: "https://restaurantemawey.com/wp-content/uploads/2023/06/Tacos-de-Presa-iberica-con-sobrasada-salsa-borracha-y-queso-Cotija-mexicano.webp"
        }
      ]
    }
  ];

  openModal(item: any) {
    console.log('Plato seleccionado:', item);
  }
}
