import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato, TipoVeicolo, Alimentazione } from '../../types/db.type';
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
  filterByType: TipoVeicolo | null = null;
  filterByBrand: string | undefined = undefined;
  filterByModel: string | undefined = undefined;
  filterByYear: number | undefined = undefined;
  filterByFuel: Alimentazione | string | null = null;
  filterByPrice: {min: number, max: number} | null = null;
  filterByKm: {min: number, max: number} | null = null;

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

  toggleType(type: TipoVeicolo | null) {
    this.filterByType = type;
    this.filterByBrand = undefined;
    this.filterByModel = undefined;
    this.filterByYear = undefined;
    this.filterByFuel = null;
    this.applyFilters();
  }

  applyBrandFilter(brand: string | undefined) {
    this.filterByBrand = (brand === 'all') ? undefined : brand;
    this.applyFilters();
  }
  
  applyModelFilter(model: string | undefined) {
    this.filterByModel = (model == 'all') ? undefined : model ;
    this.applyFilters();
  }

  applyYearFilter(year: number | undefined){
    this.filterByYear = (year == 1000 ) ? undefined : year;
    this.applyFilters();
  }

  applyFuelFilter(fuel: Alimentazione | string | null){
    this.filterByFuel = (fuel === 'all') ? null : fuel;
    this.applyFilters();
  }

  // Intercetta il filtro di prezzo
  onFilterByPrice(price: { min: number, max: number }) {
    this.filterByPrice = price;
    this.applyFilters();
  }

  // Intercetta il filtro di chilometraggio
  onFilterByKm(km: { min: number, max: number }) {
    this.filterByKm = km;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredVehicles = this.vehicles.filter(veicolo => {
      return (!this.filterByType || veicolo.tipo === this.filterByType) &&
             (!this.filterByBrand || veicolo.brand === this.filterByBrand) &&
             (!this.filterByModel || veicolo.modello === this.filterByModel) &&
             (!this.filterByYear || veicolo.anno === this.filterByYear) &&
             (!this.filterByFuel || veicolo.alimentazione === this.filterByFuel) &&
             (!this.filterByPrice || (veicolo.prezzo >= this.filterByPrice.min && veicolo.prezzo <= this.filterByPrice.max)) &&
           (!this.filterByKm || (veicolo.kilometri >= this.filterByKm.min && veicolo.kilometri <= this.filterByKm.max));
    });
  }
}