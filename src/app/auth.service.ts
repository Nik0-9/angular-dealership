import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utente, Ruolo, DB } from './types/db.type'; // Importa Utente e Ruolo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenti: Utente[] = DB.utenti;

  private currentUser: Utente | null = null;

  constructor() {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser){
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(username: string, password: string, role: Ruolo): boolean {
    const user = this.utenti.find(u => u.username === username && u.password === password && u.ruolo === role);
    if (user) {
      this.currentUser = user;      
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedUser');
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  get userRole(): Ruolo | null {
    return this.currentUser ? this.currentUser.ruolo : null;
  }

  getUserDetails(){
    const userDetails = {
      name: this.currentUser?.username,
      role: this.currentUser?.ruolo
    }
    return userDetails;
  }
}
