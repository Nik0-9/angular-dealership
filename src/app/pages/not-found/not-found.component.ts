import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 class="text-4xl font-bold mb-4">404</h1>
      <p class="text-lg">Page Not Found</p>
      <a (click)="navigateBasedOnRole()" class="mt-4 text-blue-500 underline">Return to Home</a>
    </div>
  `,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router, private authService: AuthService) {}
  navigateBasedOnRole(): void {
    // Controlla il ruolo dell'utente e naviga alla pagina corrispondente
    const userRole = this.authService.userRole;
    if (userRole === 'ADMIN') {
      this.router.navigate(['/showcase']);
    } else if (userRole === 'USER') {
      this.router.navigate(['/my-vehicles']);
    }
  }
}
