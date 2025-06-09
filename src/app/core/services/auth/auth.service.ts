import { Injectable, signal, WritableSignal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { localStorageKeys } from '../../../shared/interfaces/localStorageKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private userEmailSignal: WritableSignal<string | null> = signal(null);

  constructor() {}

  get currentToken(): string {
    return localStorage.getItem(localStorageKeys.JWT)!;
  }

  get isTokenAvailabe(): boolean {
    return !!localStorage.getItem(localStorageKeys.JWT);
  }

  get decodeToken() {
    return this.jwtHelper.decodeToken(
      localStorage.getItem(localStorageKeys.JWT)!
    )!;
  }

  getUser() {
    return this.decodeToken;
  }

  setUserEmail(email: string): void {
    this.userEmailSignal.set(email);
  }
  // Method to get the user's email signal
  getUserEmailSignal(): WritableSignal<string | null> {
    return this.userEmailSignal;
  }
}
