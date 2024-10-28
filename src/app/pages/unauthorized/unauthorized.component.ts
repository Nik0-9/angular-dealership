import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.checkAuthentication();
  }
  checkAuthentication(): void {
    // Se l'utente non è autenticato, reindirizza alla homepage o al login
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
  // navigateBasedOnRole(): void {
  //   // Controlla il ruolo dell'utente e naviga alla pagina corrispondente
  //   const userRole = this.authService.userRole;
  //   if (userRole === 'ADMIN') {
  //     this.router.navigate(['/showcase']);
  //   } else if (userRole === 'USER') {
  //     this.router.navigate(['/my-vehicles']);
  //   }
  // }
}
