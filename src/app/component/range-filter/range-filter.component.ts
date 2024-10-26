import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.scss'],
  standalone: true,
  imports: [MatSliderModule, FormsModule, CommonModule],
})
export class RangeFilterComponent {
  @Output() filterByPrice = new EventEmitter<{ min: number; max: number }>();
  @Output() filterByKm = new EventEmitter<{ min: number; max: number }>();

  priceRange = { min: 0, max: 100000 };
  kmRange = { min: 0, max: 500000 };


  onPriceChange() {
    this.filterByPrice.emit({ min: this.priceRange.min, max: this.priceRange.max });
  }

  onKmChange() {
    this.filterByKm.emit({ min: this.kmRange.min, max: this.kmRange.max });
  }
}
