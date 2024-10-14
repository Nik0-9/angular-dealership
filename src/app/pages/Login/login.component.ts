import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Ruolo, DB, Utente } from '../../types/db.type';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LogInComponent {

  userForm: FormGroup;

  constructor(private form: FormBuilder, private router: Router) {
    this.userForm = this.form.group({
      role: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

   validateUser(username: string, password: string): Utente | null {
    const user = DB.utenti.find((utente) => utente.username === username && utente.password === password);
    return user || null;
  }

   onSubmit() {
    const username = this.userForm.get('user')?.value;
    const password = this.userForm.get('password')?.value;
    const role = this.userForm.get('role')?.value;

    if (this.userForm.valid) {
      const validUser = this.validateUser(username, password);

    if (validUser) {
      // Verifica il ruolo dell'utente
      if (validUser.ruolo === Ruolo.ADMIN && role === Ruolo.ADMIN) {
        this.router.navigate(['/showcase']); // Naviga alla vetrina per admin
      } else if (validUser.ruolo === Ruolo.USER && role === Ruolo.USER) {
        this.router.navigate(['']); // Naviga alla home per user
      } else {
        console.log('Ruolo non corretto per questo utente');
      }
    } else {
      console.log('Username o password non validi');
    }
  } else {
    console.log('Form non valido');
  }
}
}
