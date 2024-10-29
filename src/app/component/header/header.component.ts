import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSmallScreen: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  get isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get userRole() {
    return this.authService.userRole;
  }

  logout(): void {
    this.authService.logout(); // Assicurati di avere questa funzione nel tuo AuthService
    this.router.navigate(['/login']);
  }
}