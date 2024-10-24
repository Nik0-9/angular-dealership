import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veicolo, Utente } from '../../types/db.type';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../email.service';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle!: Veicolo
  @Input() user!: Utente | undefined;
  canBuy: boolean = false;
  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.route.url.subscribe((url) => {
      if (url.some((segment) => segment.path === 'vehicle-for-sale')) {
        this.canBuy = true;
      }
    });
  }

  purchaseVehicle(){
    console.log('acquista cliccato');
    console.log('User:', this.user);
    
    if(this.user){
      this.emailService.sendPurchaseConfirmation(this.vehicle, this.user)
      .then(res =>{
        console.log('Success', res.status, res.text);
        alert('Email inviata!');
      })
      .catch(error => {
        console.error('Failed...', error);
        alert('Errore durante l\'invio della mail');
      });
    }
  }

}
