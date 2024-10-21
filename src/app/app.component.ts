import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogInComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Concessionaria';
}
