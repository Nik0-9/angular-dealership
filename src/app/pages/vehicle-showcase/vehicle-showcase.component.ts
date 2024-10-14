import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato } from '../../types/db.type'; // Importa il DB
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-vehicle-showcase',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent ],
  templateUrl: './vehicle-showcase.component.html',
  styleUrl: './vehicle-showcase.component.scss',
})
export class VehicleShowcaseComponent {
  vehiclesForSale: Veicolo[] = [];

  constructor() {
    this.vehiclesForSale = DB.veicoli.filter(
      (veicolo) => veicolo.stato === Stato.VENDESI
    );
  }
}
