import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TipoVeicolo, Veicolo, Alimentazione } from '../../types/db.type';
import { CommonModule } from '@angular/common';
import { FuelFilterComponent } from '../fuel-filter/fuel-filter.component';

interface FilterState {
  selectedType: TipoVeicolo | null;
  selectedBrand: string | null;
  selectedModel: string | null;
  selectedYear: number | null;
  selectedFuel: Alimentazione | null;
}

@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule, FuelFilterComponent],
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.scss'],
})
export class VehicleFilterComponent implements OnInit {
  @Input() vehicles: Veicolo[] = []; // Riceve tutti i veicoli
  @Output() filterByType = new EventEmitter<TipoVeicolo | null>();
  @Output() filterByBrand = new EventEmitter<string | undefined>();
  @Output() filterByModel = new EventEmitter<string | undefined>();
  @Output() filterByYear = new EventEmitter<number | undefined>();
  @Output() filterByFuel = new EventEmitter<Alimentazione | null>();

  TipoVeicolo = TipoVeicolo;
  availableBrands: string[] = [];
  availableModels: string[] = [];
  availableYears: number[] = [];
  Alimentazione = Alimentazione;

  // Oggetto di stato centrale
  filterState: FilterState = {
    selectedType: null as TipoVeicolo | null,
    selectedBrand: null,
    selectedModel: null,
    selectedYear: null,
    selectedFuel: null as Alimentazione | null,
  };

  ngOnInit() {
    this.populateAvailableBrands();
    this.populateAvailableModels();
  }

  toggleType(type: TipoVeicolo) {
    if (this.filterState.selectedType === type) {
      // Se il tipo viene deselezionato, resetta tutto
      this.filterState.selectedType = null;
      this.filterState.selectedBrand = null;
      this.filterState.selectedModel = null;
      this.filterState.selectedYear = null;
    } else {
      // Se un nuovo tipo viene selezionato, resetta il brand e il modello
      this.filterState.selectedType = type;
      this.filterState.selectedBrand = null;
      this.filterState.selectedModel = null;
      this.filterState.selectedYear = null;
    }

    // Ripopola la lista dei brand e dei modelli dopo il cambiamento del tipo
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
    this.filterByBrand.emit(this.filterState.selectedBrand || undefined);
    this.filterByModel.emit(this.filterState.selectedModel || undefined);
    this.filterByYear.emit(this.filterState.selectedYear || undefined);
    this.filterByFuel.emit(this.filterState.selectedFuel || null);

    // Aggiorna le opzioni di brand e modello dopo il filtro
    this.populateAvailableBrands();
    this.populateAvailableModels();
    this.populateAvailableYears();
  }

  handleBrandChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedBrand =
      selectElement.value === 'all' ? null : selectElement.value;
    this.filterState.selectedModel = null;
    this.applyFilters();
  }

  handleModelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedModel =
      selectElement.value === 'all' ? null : selectElement.value;
    this.applyFilters();
  }

  handleYearChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterState.selectedYear =
      selectElement.value === 'all' ? null : Number(selectElement.value);
    this.applyFilters();
  }

  applyFuelFilter(fuel: Alimentazione | null) {
    this.filterState.selectedFuel = fuel;
    this.filterByFuel.emit(fuel);
  }

  handleFuelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedFuel = selectElement.value === 'all' ? null : selectElement.value as Alimentazione;
    this.filterState.selectedFuel = selectedFuel;
    this.applyFilters(); // Assicurati che questo chiami applyFilters
  }

}
