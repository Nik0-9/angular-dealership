import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TipoVeicolo, Veicolo, Alimentazione } from '../../types/db.type';
import { CommonModule } from '@angular/common';
import { FuelFilterComponent } from '../fuel-filter/fuel-filter.component';
import { RangeFilterComponent } from '../range-filter/range-filter.component';

interface FilterState {
  selectedType: TipoVeicolo | null;
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedYear: number | null;
  selectedFuel: Alimentazione | null | string;
}

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule, FuelFilterComponent, RangeFilterComponent],
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.scss'],
})
export class VehicleFilterComponent implements OnInit {
  @Input() vehicles: Veicolo[] = [];
  @Output() filterByType = new EventEmitter<TipoVeicolo | null>();
  @Output() filterByFuel = new EventEmitter<Alimentazione | null | string>();
  @Output() filterByBrand = new EventEmitter<string | undefined>();
  @Output() filterByModel = new EventEmitter<string | undefined>();
  @Output() filterByYear = new EventEmitter<number | undefined>();
  @Output() filterByPrice = new EventEmitter<{ min: number; max: number }>();
  @Output() filterByKm = new EventEmitter<{ min: number; max: number }>();
  @ViewChild(FuelFilterComponent) fuelFilterComponent!: FuelFilterComponent;

  TipoVeicolo = TipoVeicolo;
  Alimentazione = Alimentazione;
  availableBrands: string[] = [];
  availableModels: string[] = [];
  availableYears: number[] = [];

  // Oggetto di stato centrale
  filterState: FilterState = {
    selectedType: null as TipoVeicolo | null,
    selectedFuel: null as Alimentazione | null,
    selectedBrand: null,
    selectedModel: null,
    selectedYear: null,
  };

  ngOnInit() {
    this.populateAvailableBrands();
    this.populateAvailableModels();
    this.populateAvailableYears();
    console.log(this.filterState.selectedFuel);
  }

  toggleType(type: TipoVeicolo) {
    if (this.filterState.selectedType === type) {
      // Se il tipo viene deselezionato, resetta tutto
      this.filterState.selectedType = null;
      this.filterState.selectedBrand = null;
      this.filterState.selectedModel = null;
      this.filterState.selectedYear = null;
      this.filterState.selectedFuel = null;
    } else {
      this.filterState.selectedType = type;
      this.filterState.selectedBrand = null;
      this.filterState.selectedModel = null;
      this.filterState.selectedYear = null;
      this.filterState.selectedFuel = null;
    }
    console.log('selected:'+ this.filterState.selectedType);
    console.log('type:'+ type);
    // Ripopola le opzioni disponibili in base ai nuovi filtri
    this.populateAvailableBrands();
    this.populateAvailableModels();
    this.populateAvailableYears();
    // Applica i filtri aggiornati
    this.applyFilters();
  }

  populateAvailableBrands() {
    if (this.filterState.selectedType) {
      // Popola solo i brand corrispondenti al tipo selezionato
      this.availableBrands = [
        ...new Set(
          this.vehicles
            .filter((veicolo) => veicolo.tipo === this.filterState.selectedType)
            .map((veicolo) => veicolo.brand)
        ),
      ];

      // Se il brand selezionato non appartiene più ai brand disponibili, resettalo
      if (
        this.filterState.selectedBrand &&
        !this.availableBrands.includes(this.filterState.selectedBrand)
      ) {
        this.filterState.selectedBrand = null;
      }
    } else {
      // Popola tutti i brand disponibili se non è selezionato alcun tipo
      this.availableBrands = [
        ...new Set(this.vehicles.map((veicolo) => veicolo.brand)),
      ];
    }
  }

  populateAvailableModels() {
    if (this.filterState.selectedBrand) {
      //Popola solo i modelli che appartengono al brand selezionato
      this.availableModels = [
        ...new Set(
          this.vehicles
            .filter(
              (veicolo) => veicolo.brand === this.filterState.selectedBrand
            )
            .map((veicolo) => veicolo.modello)
        ),
      ];
    } else {
      this.availableModels = [
        ...new Set(
          this.vehicles
            .filter((veicolo) => veicolo.tipo === this.filterState.selectedType)
            .map((veicolo) => veicolo.modello)
        ),
      ];
    }
  }

  populateAvailableYears() {
    // Popola solo gli anni disponibili corrispondenti ai filtri selezionati
    const filteredVehicles = this.vehicles.filter((veicolo) => {
      return (
        (!this.filterState.selectedType ||
          veicolo.tipo === this.filterState.selectedType) &&
        (!this.filterState.selectedBrand ||
          veicolo.brand === this.filterState.selectedBrand) &&
        (!this.filterState.selectedModel ||
          veicolo.modello === this.filterState.selectedModel)
      );
    });

    this.availableYears = [
      ...new Set(filteredVehicles.map((veicolo) => veicolo.anno)),
    ];
    this.availableYears.sort((a, b) => b - a); // Ordina gli anni in ordine decrescente
  }

  applyFilters() {
    // Emette gli eventi con lo stato attuale dei filtri
    this.filterByType.emit(this.filterState.selectedType);
    this.filterByFuel.emit(this.filterState.selectedFuel || null);
    this.filterByBrand.emit(this.filterState.selectedBrand || undefined);
    this.filterByModel.emit(this.filterState.selectedModel || undefined);
    this.filterByYear.emit(this.filterState.selectedYear || undefined);

    // Aggiorna le opzioni di brand e modello dopo il filtro
    this.populateAvailableBrands();
    this.populateAvailableModels();
    this.populateAvailableYears();
  }

  handleModelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedModel =
      selectElement.value === 'all' ? null : selectElement.value;
    this.populateAvailableYears();
    this.applyFilters();
  }

  handleBrandChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedBrand =
      selectElement.value === 'all' ? null : selectElement.value;
    this.filterState.selectedModel = null;
    this.applyFilters();
  }

  handleYearChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedYear =
      selectElement.value === 'all' ? null : Number(selectElement.value);
    this.applyFilters();
  }

  applyFuelFilter(fuel: Alimentazione | null | string) {
    this.filterState.selectedFuel = fuel;
    this.applyFilters();
  }

  applyPriceFilter(price: { min: number; max: number }) {
    this.filterByPrice.emit(price);
  }

  applyKmFilter(km: { min: number; max: number }) {
    this.filterByKm.emit(km);
  }
}
