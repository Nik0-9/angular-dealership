import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Ruolo, DB, Utente } from '../../types/db.type';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LogInComponent {
  loginForm: FormGroup;
  formError: string | null = null;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.form.group({
      role: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.formError = null;
    const username = this.loginForm.get('user')?.value;
    const password = this.loginForm.get('password')?.value;
    const role = this.loginForm.get('role')?.value;

    if (this.loginForm.valid) {
      // Usa il servizio per autenticare l'utente
      if (this.authService.login(username, password)) {
        const userRole = this.authService.userRole;

        // Verifica il ruolo dell'utente
        if (userRole === Ruolo.ADMIN && role === Ruolo.ADMIN) {
          this.router.navigate(['/showcase']);
        } else if (userRole === Ruolo.USER && role === Ruolo.USER) {
          this.router.navigate(['/my-vehicles']);
        } else {
          this.formError = 'Ruolo non corretto per questo utente';
        }
      } else {
        this.formError = 'Username o password non validi';
      }
    } else {
      console.log('Form non valido');
    }
  }
}