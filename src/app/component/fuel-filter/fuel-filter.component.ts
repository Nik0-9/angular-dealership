import { Component, Output, EventEmitter } from '@angular/core';
import { Alimentazione } from '../../types/db.type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fuel-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fuel-filter.component.html',
  styleUrls: ['./fuel-filter.component.scss'],
})
export class FuelFilterComponent {
  @Output() filterByFuel = new EventEmitter<Alimentazione | null>();

  alimentazioni = Object.values(Alimentazione); // Ottieni tutti i tipi di alimentazione

  handleFuelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const fuel = selectElement.value === 'all' ? null : selectElement.value as Alimentazione;
    this.filterByFuel.emit(fuel);
  }
}
