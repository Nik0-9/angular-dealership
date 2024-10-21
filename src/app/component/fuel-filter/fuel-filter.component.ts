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
  @Output() filterByFuel = new EventEmitter<Alimentazione | null>();

  alimentazioni = Object.values(Alimentazione); // Ottieni tutti i tipi di alimentazione
  selectedFuel: Alimentazione | null | string = null;

  ngOnInit() {
    // Emetti il valore predefinito per indicare "Tutte le alimentazioni" all'inizio
    this.filterByFuel.emit(null);
  }

  handleFuelChange(value: string) {
    const fuel = value === 'all' ? null : (value as Alimentazione);
    this.filterByFuel.emit(fuel);
  }

  resetFuelSelection() {
    this.selectedFuel = null; // Resetta il valore di selectedFuel
    this.filterByFuel.emit(null); // Emette null per resettare il filtro
  }
}

