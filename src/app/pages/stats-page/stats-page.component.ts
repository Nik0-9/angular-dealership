import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veicolo, DB, Stato } from '../../types/db.type';
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent],
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent {
  vehiclesSold: Veicolo[] = [];

  autoPrezzoMassimo: Veicolo | null = null;
  autoPrezzoMinimo: Veicolo | null = null;
  prezzoMedioVendite: number = 0;
  marchioPiuVenduto: string = '';

  constructor() {
    // Filtro dei veicoli venduti
    this.vehiclesSold = DB.veicoli.filter(
      (veicolo) => veicolo.stato === Stato.VENDUTO
    );

    this.autoPrezzoMassimo = this.getAutoPrezzoMassimo();
    this.autoPrezzoMinimo = this.getAutoPrezzoMinimo();
    this.prezzoMedioVendite = this.getPrezzoMedioVendite();
    this.marchioPiuVenduto = this.getMarchioPiuVenduto();
  }

  // Calcola l'auto venduta a prezzo massimo
  getAutoPrezzoMassimo(): Veicolo | null {
    if (this.vehiclesSold.length > 0) {
      return this.vehiclesSold.reduce((prev, curr) =>
        prev.prezzo > curr.prezzo ? prev : curr
      );
    }
    return null;
  }

  // Calcola l'auto venduta a prezzo minimo
  getAutoPrezzoMinimo(): Veicolo | null {
    if (this.vehiclesSold.length > 0) {
      return this.vehiclesSold.reduce((prev, curr) =>
        prev.prezzo < curr.prezzo ? prev : curr
      );
    }
    return null;
  }

  // Calcola il prezzo medio delle vendite
  getPrezzoMedioVendite(): number {
    const total = this.vehiclesSold.reduce(
      (sum, veicolo) => sum + veicolo.prezzo,
      0
    );
    return this.vehiclesSold.length > 0 ? total / this.vehiclesSold.length : 0;
  }

  // Determina il marchio più venduto
  getMarchioPiuVenduto(): string {
    const marcaCount = this.vehiclesSold.reduce((acc, veicolo) => {
      acc[veicolo.brand] = (acc[veicolo.brand] || 0) + 1;
      return acc;
    }, {} as { [marca: string]: number });

    return Object.keys(marcaCount).reduce(
      (prev, curr) => (marcaCount[prev] > marcaCount[curr] ? prev : curr),
      ''
    );
  }
}
