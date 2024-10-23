import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DB,
  Veicolo,
  Stato,
  TipoVeicolo,
  Alimentazione,
} from '../../types/db.type';
import { ActivatedRoute } from '@angular/router';
import { VehicleFilterComponent } from '../../component/vehicle-filter/vehicle-filter.component';
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';
import { AuthService } from '../../auth.service';


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
  filterByBrand: string | null = null;
  filterByModel: string | null = null;
  filterByYear: number | null = null;
  filterByFuel: Alimentazione | string | null = '';
  filterByPrice: { min: number; max: number } | null = null;
  filterByKm: { min: number; max: number } | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    const userRole = this.authService.userRole; // Ottieni il ruolo dell'utente
    console.log('Ruolo dell\'utente loggato:', userRole);
    this.route.url.subscribe((url) => {
      if (url.some((segment) => segment.path === 'sold')) {
        this.pageTitle = 'Veicoli venduti';
        this.vehicles = DB.veicoli.filter(
          (veicolo) => veicolo.stato === Stato.VENDUTO
        );
      }
      else if (url.some((segment) => segment.path === 'my-vehicles')) {
        this.pageTitle = 'I miei veicolo';
        this.vehicles = DB.veicoli.filter(
          (veicolo) => veicolo.stato === Stato.VENDUTO
        );
      } else {
        this.pageTitle = 'Veicoli in Vendita';
        this.vehicles = DB.veicoli.filter(
          (veicolo) => veicolo.stato === Stato.VENDESI
        );
      }
      this.filteredVehicles = this.vehicles;
    });
  }

  applyTypeFilter(selectedType: TipoVeicolo | null) {
    this.filterByType = selectedType;
    if (this.filterByType === null) {
      this.filterByType = null;
      this.filterByBrand = null;
      this.filterByModel = null;
      this.filterByYear = null;
      this.filterByFuel = null;
    } else {
      this.filterByType = selectedType;
      this.filterByBrand = null;
      this.filterByModel = null;
      this.filterByYear = null;
      this.filterByFuel = null;
    }

    this.applyFilters();
  }

  applyFilters() {
    this.filteredVehicles = this.vehicles.filter((veicolo) => {
      return (
        (!this.filterByType || veicolo.tipo === this.filterByType) &&
        (!this.filterByBrand || veicolo.brand === this.filterByBrand) &&
        (!this.filterByModel || veicolo.modello === this.filterByModel) &&
        (!this.filterByYear || veicolo.anno === this.filterByYear) &&
        (!this.filterByFuel || veicolo.alimentazione === this.filterByFuel) &&
        (!this.filterByPrice ||
          (veicolo.prezzo >= this.filterByPrice.min &&
            veicolo.prezzo <= this.filterByPrice.max)) &&
        (!this.filterByKm ||
          (veicolo.kilometri >= this.filterByKm.min &&
            veicolo.kilometri <= this.filterByKm.max))
      );
    });
  }
  applyBrandFilter(brand: string | null) {
    this.filterByBrand = brand === 'all' ? null : brand;
    this.applyFilters();
  }

  applyModelFilter(model: string | null) {
    this.filterByModel = model == 'all' ? null : model;
    this.applyFilters();
  }

  applyYearFilter(year: number | null) {
    this.filterByYear = year == 1000 ? null : year;
    this.applyFilters();
  }

  applyFuelFilter(fuel: Alimentazione | string | null) {
    this.filterByFuel = fuel === 'all' ? null : fuel;
    this.applyFilters();
  }

  // Intercetta il filtro di prezzo
  onFilterByPrice(price: { min: number; max: number }) {
    this.filterByPrice = price;
    this.applyFilters();
  }

  // Intercetta il filtro di chilometraggio
  onFilterByKm(km: { min: number; max: number }) {
    this.filterByKm = km;
    this.applyFilters();
  }
}
