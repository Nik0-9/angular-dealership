import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veicolo } from '../../types/db.type';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent {
  @Input() vehicle!: Veicolo;
}
