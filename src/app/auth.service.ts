import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utente, Ruolo, DB } from './types/db.type'; // Importa Utente e Ruolo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenti: Utente[] = [
    { username: 'admin', password: 'passwordAdmin123', ruolo: Ruolo.ADMIN },
    { username: 'user', password: 'passwordUser123', ruolo: Ruolo.USER }
  ];

  private currentUser: Utente | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.utenti.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get userRole(): Ruolo | null {
    return this.currentUser ? this.currentUser.ruolo : null;
  }
}
