import { Component, Output, EventEmitter } from '@angular/core';
import { Alimentazione } from '../../types/db.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fuel-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fuel-filter.component.html',
  styleUrls: ['./fuel-filter.component.scss'],
})
export class FuelFilterComponent {
  @Output() filterByFuel = new EventEmitter<Alimentazione | null | string>();

  alimentazioni = Object.values(Alimentazione); // Ottieni tutti i tipi di alimentazione
  selectedFuel: Alimentazione | null | string = null;

  ngOnInit() {
    // Emetti il valore predefinito per indicare "Tutte le alimentazioni" all'inizio
    this.filterByFuel.emit(null);
  }

  handleFuelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFuel = selectElement.value === 'all' ? null : selectElement.value as Alimentazione;
    this.filterByFuel.emit(this.selectedFuel);
  }

  resetFuelSelection() {
    this.selectedFuel = null; // Resetta il valore di selectedFuel
    this.filterByFuel.emit('all'); // Emette null per resettare il filtro
  }
}

