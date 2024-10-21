import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.scss'],
})
export class RangeFilterComponent {
  @Output() filterByPrice = new EventEmitter<{ min: number; max: number }>();
  @Output() filterByKm = new EventEmitter<{ min: number; max: number }>();

  priceMin: number = 0;
  priceMax: number = 100000;

  kmMin: number = 0;
  kmMax: number = 500000;

  priceRange = { min: 0, max: 100000 };
  kmRange = { min: 0, max: 500000 };

  handlePriceChange() {
    // Assicurati che priceMin e priceMax siano sincronizzati
    if (this.priceMin > this.priceMax) {
      this.priceMin = this.priceMax;
    }
    this.filterByPrice.emit({ min: this.priceMin, max: this.priceMax });
  }

  handleKmChange() {
    // Assicurati che kmMin e kmMax siano sincronizzati
    if (this.kmMin > this.kmMax) {
      this.kmMin = this.kmMax;
    }
    this.filterByKm.emit({ min: this.kmMin, max: this.kmMax });
  }
}
