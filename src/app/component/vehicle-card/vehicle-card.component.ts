import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veicolo, Utente } from '../../types/db.type';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle!: Veicolo
  @Input() user!: Utente | undefined;
  @Input() to_email: string = '';
  canBuy: boolean = false;
  showModal: boolean = false;
  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.route.url.subscribe((url) => {
      if (url.some((segment) => segment.path === 'vehicle-for-sale')) {
        this.canBuy = true;
      }
    });
  }
  openPurchaseModal() {
    this.showModal = true;
  }

  cancelPurchase() {
    this.showModal = false; 
  }
  purchaseVehicle(to_email: string){
    this.showModal = false;
    
    if(this.user){
      this.emailService.sendPurchaseConfirmation(this.vehicle, this.user, to_email)
      .then(res =>{
        console.log('Success', res.status, res.text);
        alert('Email inviata all\'indirizzo: ' + to_email);
      })
      .catch(error => {
        console.error('Failed...', error);
        alert('Errore durante l\'invio della mail');
      });
    }
  }

}
