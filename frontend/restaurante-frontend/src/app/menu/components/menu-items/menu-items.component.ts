import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem, Categoria } from '../../services/menu.service';
import { ModalItemsComponent } from '../modal-items/modal-items.component';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
  imports: [CommonModule, ModalItemsComponent]
})
export class MenuItemsComponent implements OnInit {
  menuFiltrado: MenuItem[] = []; // Platos filtrados por categoría
  categorias: Categoria[] = []; // Categorías desde la API
  categoriaSeleccionada: number | null = null; // ID de la categoría seleccionada

  selectedItem: MenuItem = { nombre: "", descripcion: "", precio: 0, alergenos: [], imagen: "", nickname: "", cantidad: 0, categoria: 0 };
  isModalOpen = false;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.loadCategorias();
    this.filtrarMenu(null); // Cargar todos los platos por defecto
  }

  // Cargar todas las categorías
  loadCategorias() {
    this.menuService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      console.log("Categorías cargadas:", this.categorias);
    });
  }

  // Filtrar platos por el ID de la categoría seleccionada
  filtrarMenu(categoriaId: number | null) {
    this.categoriaSeleccionada = categoriaId;

    if (categoriaId === null) {
      // Cargar todos los platos si no hay filtro
      this.menuService.getPlatos().subscribe(platos => {
        this.menuFiltrado = platos;
        console.log("Mostrando todos los platos:", this.menuFiltrado);
      }, error => {
        console.error("Error al obtener todos los platos:", error);
      });
    } else {
      // Cargar platos por categoría usando el endpoint
      this.menuService.getPlatosPorCategoria(categoriaId).subscribe(platos => {
        this.menuFiltrado = platos;
        console.log(`Platos en la categoría ${categoriaId}:`, this.menuFiltrado);
      }, error => {
        console.error("Error al obtener platos por categoría:", error);
        this.menuFiltrado = [];
      });
    }
  }

  // Abrir modal con el plato seleccionado
  openModal(item: MenuItem) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }

  

  closeModal() {
    this.isModalOpen = false;
  }

  actualizarPlato() {
    if (this.selectedItem.id !== undefined) {
      this.menuService.updatePlato(this.selectedItem.id, this.selectedItem).subscribe(() => {
        alert("Plato actualizado correctamente ✅");
        this.closeModal();
        this.filtrarMenu(this.categoriaSeleccionada); // Recargar la lista con el filtro actual
      }, error => {
        console.error("Error al actualizar el plato ❌:", error);
        alert("Hubo un error al actualizar el plato ❌");
      });
    } else {
      alert("Error: No se puede actualizar un plato sin ID ❌");
    }
  }
}
