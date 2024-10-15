import { Component, Output, EventEmitter } from '@angular/core';
import { TipoVeicolo } from '../../types/db.type';

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-filter.component.html',
  styleUrl: './vehicle-filter.component.scss',
})
export class VehicleFilterComponent {
  TipoVeicolo = TipoVeicolo
  @Output() filterByType = new EventEmitter<TipoVeicolo>();
  filter(type: TipoVeicolo) {
    this.filterByType.emit(type);
  }
}
