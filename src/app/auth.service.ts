import { Injectable } from '@angular/core';
import { Utente, Ruolo, DB } from './types/db.type'; // Importa Utente e Ruolo
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenti: Utente[] = DB.utenti;

  private currentUser: Utente | null = null;

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser){
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(username: string, password: string): boolean {
    const user = this.utenti.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user; 
      this.currentUser.ruolo = user.ruolo;     
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
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
