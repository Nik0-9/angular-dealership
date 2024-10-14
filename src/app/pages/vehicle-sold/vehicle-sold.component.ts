import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato } from '../../types/db.type'; // Importa il DB
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';


@Component({
  selector: 'app-vehicle-sold',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent],
  templateUrl: './vehicle-sold.component.html',
  styleUrl: './vehicle-sold.component.scss'
})
export class VehicleSoldComponent {
  vehiclesSold: Veicolo[] = [];

  constructor() {
    this.vehiclesSold = DB.veicoli.filter(
      (veicolo) => veicolo.stato === Stato.VENDUTO
    );
  }
}
