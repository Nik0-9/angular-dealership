import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veicolo } from '../../types/db.type';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle!: Veicolo;
  canBuy: boolean = false;
  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((url) => {
      if (url.some((segment) => segment.path === 'vehicle-for-sale')) {
        this.canBuy = true;
      }
    });
  }

}
