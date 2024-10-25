import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogInComponent, HeaderComponent, CommonModule],
  template: `
  <app-header></app-header>
    <div [ngClass]="{'admin-layout': authService.userRole === 'ADMIN'}">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Concessionaria';
  constructor(public authService: AuthService) {}
}
