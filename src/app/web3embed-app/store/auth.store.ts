import { Injectable } from "@angular/core";
import { signal, computed } from "@angular/core";
import { User } from "../models/user.model";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: User;
}
@Injectable({ providedIn: 'root' })
export class AuthStore {
    private readonly authService = inject(AuthService);
  private readonly _user = signal<User | null>(null);
  private readonly _accessToken = signal<string | null>(null);
  private readonly _refreshToken = signal<string | null>(null);
  readonly user = computed(() => this._user());
  readonly accessToken = computed(() => this._accessToken());
  readonly refreshToken = computed(() => this._refreshToken());
  private _loginStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
readonly loginStatus = computed(() => this._loginStatus());
readonly isLoggedIn = computed(() => !!this._accessToken());


restoreFromStorage(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
  
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const user = localStorage.getItem('user');
  
    if (accessToken && refreshToken && user) {
      this._accessToken.set(accessToken);
      this._refreshToken.set(refreshToken);
      this._user.set(JSON.parse(user));
    }
  }

login(loginData: { email: string; password: string }) {
    this._loginStatus.set('loading');
    this.authService.login(loginData.email, loginData.password).subscribe({
      next: (loginResponse: LoginResponse) => {
        this._accessToken.set(loginResponse.access_token);
        this._refreshToken.set(loginResponse.refresh_token);
        this._user.set(loginResponse.user);
        this._loginStatus.set('success');
        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('refresh_token', loginResponse.refresh_token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));
      },
      error: () => {
        this._user.set(null);
        this._accessToken.set(null);
        this._refreshToken.set(null);
        this._loginStatus.set('error');
      }
    });
  }

  logout() {
    this._user.set(null);
    this._accessToken.set(null);
    this._refreshToken.set(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
}
