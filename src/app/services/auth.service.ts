import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // default to false
  currentUserStatus = this.loggedIn.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn.next(true);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ username })); // Store user details in localStorage
      this.loggedIn.next(true); // Update login status
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false); // Update login status
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value; // Returns current login status
  }
}
