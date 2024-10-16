import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato, TipoVeicolo } from '../../types/db.type';
import { ActivatedRoute } from '@angular/router';
import { VehicleFilterComponent } from '../../component/vehicle-filter/vehicle-filter.component';
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';
@Component({
  selector: 'app-vehicle-showcase',
  standalone: true,
  imports: [VehicleFilterComponent, VehicleCardComponent, CommonModule],
  templateUrl: './vehicle-showcase.component.html',
  styleUrls: ['./vehicle-showcase.component.scss'],
})
export class VehicleShowcaseComponent {
  vehicles: Veicolo[] = [];
  filteredVehicles: Veicolo[] = [];
  pageTitle: string = '';
  selectedType: TipoVeicolo | null = null;
  selectedBrand: string | null = null;
  selectedModel: string | null = null;

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

  applyTypeFilter(type: TipoVeicolo | null) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyBrandFilter(brand: string) {
    this.selectedBrand = (brand === 'all') ? null : brand;
    this.applyFilters();
  }
  
  applyModelFilter(model: string) {
    this.selectedModel = model !== 'all' ? model : null;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredVehicles = this.vehicles.filter(veicolo => {
      return (!this.selectedType || veicolo.tipo === this.selectedType) &&
             (!this.selectedBrand || veicolo.brand === this.selectedBrand) &&
             (!this.selectedModel || veicolo.modello === this.selectedModel);
    });
  }
}