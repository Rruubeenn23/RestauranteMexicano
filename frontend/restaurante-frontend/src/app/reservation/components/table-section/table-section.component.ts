import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.css']
})
export class TableSelectionComponent {
  @Output() tableSelected = new EventEmitter<number>();

  selectedTableId: number | null = null;

  tables = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 200, y: 50 },
    { id: 3, x: 350, y: 50 },
    { id: 4, x: 50, y: 200 },
    { id: 5, x: 200, y: 200 },
    { id: 6, x: 350, y: 200 },
    { id: 7, x: 50, y: 350 },
    { id: 8, x: 200, y: 350 },
    { id: 9, x: 350, y: 350 }
  ];

  selectTable(id: number): void {
    this.selectedTableId = id;
    this.tableSelected.emit(id);
  }

  isSelected(id: number): boolean {
    return this.selectedTableId === id;
  }
}
