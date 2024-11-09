import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Veicolo, Utente } from '../types/db.type';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}
  sendPurchaseConfirmation(
    vehicle: Veicolo,
    user: Utente,
    to_email: string
  ): Promise<EmailJSResponseStatus> {
    const templateParams = {
      to_name: user.username,
      to_email: to_email.trim(),
      from_name: 'Concessionaria Angular',
      message: `Congratulazioni per il tuo nuovo veicolo. Hai acquistato ${vehicle.brand} ${vehicle.modello}, alimentata con ${vehicle.alimentazione} alla modica cifra di ${vehicle.prezzo} Euro, è quasi nuova ha solo ${vehicle.kilometri} chilometri ed è del ${vehicle.anno}`,
    };
    
    console.log('var to_email', to_email);
    
    return emailjs.send(
      'service_tdtb94q',
      'template_1cd22e4',
      templateParams,
      'pqaS9OH_oUY4DmL5U'
    );
  }
}
