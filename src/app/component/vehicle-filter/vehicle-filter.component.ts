import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { TipoVeicolo } from '../../types/db.type';

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.scss'],
})
export class VehicleFilterComponent {
  TipoVeicolo = TipoVeicolo;
  
  selectedType: TipoVeicolo | null = null;

  // Emettiamo eventi per i filtri
  @Output() filterByType = new EventEmitter<TipoVeicolo | null>();

  applyFilter(type: TipoVeicolo) {
    if (this.selectedType === type) {
      this.selectedType = null; // Deseleziona il filtro
    } else {
      this.selectedType = type; // Applica il filtro
    }
    this.filterByType.emit(this.selectedType);
  }

  isFilterActive(type: TipoVeicolo): boolean {
    return this.selectedType === type;
  }
}
