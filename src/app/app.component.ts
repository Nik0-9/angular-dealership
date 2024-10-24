import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';
import { HeaderComponent } from './component/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogInComponent, HeaderComponent],
  template: `
  <app-header></app-header>

  <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Concessionaria';
}
