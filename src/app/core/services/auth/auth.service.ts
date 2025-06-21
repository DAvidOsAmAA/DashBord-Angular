import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { localStorageKeys } from '../../../shared/interfaces/localStorageKeys';
import { Login } from '../../../shared/interfaces/Auth/login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  private userEmailSignal: WritableSignal<string | null> = signal(null);
  private platformId = inject(PLATFORM_ID);
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get currentToken(): string {
    return this.isBrowser
      ? localStorage.getItem(localStorageKeys.JWT) || ''
      : '';
  }

  get isTokenAvailabe(): boolean {
    return this.isBrowser && !!localStorage.getItem(localStorageKeys.JWT);
  }

  get decodeToken() {
    return this.isBrowser
      ? this.jwtHelper.decodeToken(localStorage.getItem(localStorageKeys.JWT)!)
      : null;
  }

  login(req: Login) {
    return this.http.post(this.env + '/auth/signin', req);
  }

  getUser() {
    return this.decodeToken;
  }

  setUserEmail(email: string): void {
    this.userEmailSignal.set(email);
  }

  getUserEmailSignal(): WritableSignal<string | null> {
    return this.userEmailSignal;
  }
}
