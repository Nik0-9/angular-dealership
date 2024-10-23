import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utente, Ruolo, DB } from './types/db.type'; // Importa Utente e Ruolo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenti: Utente[] = DB.utenti;

  private currentUser: Utente | null = null;

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser){
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(username: string, password: string, role: Ruolo): boolean {
    const user = this.utenti.find(u => u.username === username && u.password === password && u.ruolo === role);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedInUser');
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get userRole(): Ruolo | null {
    return this.currentUser ? this.currentUser.ruolo : null;
  }
}
