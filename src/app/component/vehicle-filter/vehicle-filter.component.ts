import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TipoVeicolo, Veicolo } from '../../types/db.type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vehicle-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-filter.component.html',
  styleUrl: './vehicle-filter.component.scss',
})
export class VehicleFilterComponent {
  @Input() vehicles: Veicolo[] = []; // Riceve tutti i veicoli
  @Output() filterByType = new EventEmitter<TipoVeicolo | null>();
  @Output() filterByBrand = new EventEmitter<string>();
  @Output() filterByModel = new EventEmitter<string>();

  
  TipoVeicolo = TipoVeicolo;
  availableBrands: string[] = [];
  availableModels: string[] = []; 
  selectedType: TipoVeicolo | null = null;
  selectedBrand: string | null = null;

  ngOnInit() {
    this.populateAvailableBrands(); // Popola i brand quando il componente è inizializzato
    this.populateAvailableModels();
  }

  toggleType(type: TipoVeicolo) {
    if (this.selectedType === type) {
      // Se il tipo selezionato è già attivo, deselezionalo
      this.selectedType = null;
    } else {
      // Altrimenti, seleziona il nuovo tipo
      this.selectedType = type;
    }
    this.filter(this.selectedType); // Applica il filtro
    this.populateAvailableBrands(); // Popola i brand disponibili
    this.populateAvailableModels();
  }
  
  populateAvailableBrands() {
    if (this.selectedType) {
      // Popola solo i brand corrispondenti al tipo selezionato
      this.availableBrands = [...new Set(this.vehicles
        .filter(veicolo => veicolo.tipo === this.selectedType)
        .map(veicolo => veicolo.brand))];
    } else {
      // Popola tutti i brand disponibili se non è selezionato alcun tipo
      this.availableBrands = [...new Set(this.vehicles.map(veicolo => veicolo.brand))];
    }
  }

  populateAvailableModels() {
    if (!this.selectedBrand) {
      this.availableModels = [...new Set(this.vehicles
        .filter(veicolo => !this.selectedType || veicolo.tipo === this.selectedType)
        .map(veicolo => veicolo.modello))];
    } else {
      this.availableModels = [...new Set(this.vehicles
        .filter(veicolo => veicolo.brand === this.selectedBrand)
        .map(veicolo => veicolo.modello)
      )];
    }
  }

  filter(type: TipoVeicolo | null) {
    this.filterByType.emit(type);
    this.populateAvailableBrands();
    this.populateAvailableModels();
  }
    
    applyBrandFilter(brand: string) {
      this.filterByBrand.emit(brand);
    }
    handleBrandChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement; // Asserisci che sia un HTMLSelectElement
      this.applyBrandFilter(selectElement.value);
      this.selectedBrand = selectElement.value !== 'all' ? selectElement.value : null;
      this.populateAvailableModels();
    }

    applyModelFilter(model: string) {
      this.filterByModel.emit(model); // Emissione del filtro per modello
    }

    handleModelChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement; // Asserisci che sia un HTMLSelectElement
      this.applyModelFilter(selectElement.value);
    }
  }
