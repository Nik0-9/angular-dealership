import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DB, Veicolo, Stato, TipoVeicolo } from '../../types/db.type'; 
import { VehicleCardComponent } from '../../component/vehicle-card/vehicle-card.component';
import { VehicleFilterComponent } from '../../component/vehicle-filter/vehicle-filter.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-showcase',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, VehicleFilterComponent ],
  templateUrl: './vehicle-showcase.component.html',
  styleUrl: './vehicle-showcase.component.scss',
})
export class VehicleShowcaseComponent {
  vehiclesForSale: Veicolo[] = [];
  filteredVehicles: Veicolo[] = [];
  TipoVeicolo = TipoVeicolo
  constructor() {
    this.vehiclesForSale = DB.veicoli.filter(
      (veicolo) => veicolo.stato === Stato.VENDESI
    );
    this.filteredVehicles = [...this.vehiclesForSale];
  }

  applyFilter(type:TipoVeicolo){
    console.log(`filtraggio per tipo: ${type}`);
    this.filteredVehicles = this.vehiclesForSale.filter((veicolo) => veicolo.tipo === type);
  }

  resetFilter(){
    this.filteredVehicles = [...this.vehiclesForSale];
  }
}
