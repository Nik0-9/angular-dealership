import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'template-v17';
}
