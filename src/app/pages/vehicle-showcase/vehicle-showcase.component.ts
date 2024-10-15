import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato, TipoVeicolo } from '../../types/db.type'; 
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';
import { VehicleFilterComponent } from '../../component/vehicle-filter/vehicle-filter.component';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-showcase',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, VehicleFilterComponent],
  templateUrl: './vehicle-showcase.component.html',
  styleUrls: ['./vehicle-showcase.component.scss'],
})
export class VehicleShowcaseComponent {
  vehicles: Veicolo[] = [];
  filteredVehicles: Veicolo[] = [];
  pageTitle: string = '';
  TipoVeicolo = TipoVeicolo;
  selectedType: TipoVeicolo | null = null;

  constructor(private route: ActivatedRoute) {
    // Controlla la URL per determinare lo stato dei veicoli da mostrare e il titolo
    this.route.url.subscribe(url => {
      if (url.some(segment => segment.path === 'sold')) {
        // Mostra veicoli venduti e aggiorna il titolo
        this.pageTitle = 'Veicoli Venduti';
        this.vehicles = DB.veicoli.filter(veicolo => veicolo.stato === Stato.VENDUTO);
      } else {
        // Mostra veicoli in vendita e aggiorna il titolo
        this.pageTitle = 'Veicoli in Vendita';
        this.vehicles = DB.veicoli.filter(veicolo => veicolo.stato === Stato.VENDESI);
      }
      this.filteredVehicles = this.vehicles;
    });
  }

  applyFilter(type: TipoVeicolo) {
    if (this.selectedType === type) {
      this.selectedType = null;  // Deseleziona il filtro
      this.filteredVehicles = this.vehicles;  // Mostra tutti i veicoli
    } else {
      this.selectedType = type;  // Applica il filtro selezionato
      this.filteredVehicles = this.vehicles.filter(veicolo => veicolo.tipo === type);
    }
  }

  isFilterActive(type: TipoVeicolo): boolean {
    return this.filteredVehicles.every(veicolo => veicolo.tipo === type);
  }
}
