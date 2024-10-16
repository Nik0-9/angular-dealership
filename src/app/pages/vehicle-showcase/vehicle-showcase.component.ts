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

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      if (url.some(segment => segment.path === 'sold')) {
        this.pageTitle = 'Veicoli Venduti';
        this.vehicles = DB.veicoli.filter(veicolo => veicolo.stato === Stato.VENDUTO);
      } else {
        this.pageTitle = 'Veicoli in Vendita';
        this.vehicles = DB.veicoli.filter(veicolo => veicolo.stato === Stato.VENDESI);
      }
      this.filteredVehicles = this.vehicles;
    });
  }

  // Metodo per applicare il filtro
  applyTypeFilter(type: TipoVeicolo | null) {
    if (type) {
      this.filteredVehicles = this.vehicles.filter(veicolo => veicolo.tipo === type);
    } else {
      this.filteredVehicles = this.vehicles; // Mostra tutti i veicoli
    }
  }
}
