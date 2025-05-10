// auth.store.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loginStatus: 'idle' | 'loading' | 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // State
  private state = signal<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    loginStatus: 'idle',
  });

  // Selectors
  readonly user = computed(() => this.state().user);
  readonly accessToken = computed(() => this.state().accessToken);
  readonly refreshToken = computed(() => this.state().refreshToken);
  readonly loginStatus = computed(() => this.state().loginStatus);
  readonly isLoggedIn = computed(() => !!this.state().accessToken);

  constructor() {
    // Initialize state from localStorage on app startup
    this.loadUserFromStorage();
  }

  // Actions
  login(email: string, password: string): void {
    this.state.update((state) => ({ ...state, loginStatus: 'loading' }));

    this.authService.login(email, password).subscribe({
      next: (response) => {
        const user = response.user;
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;

        // Update state
        this.state.update((state) => ({
          ...state,
          user,
          accessToken,
          refreshToken,
          loginStatus: 'success',
        }));

        // Save to localStorage
        this.saveUserToStorage(user, accessToken, refreshToken);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.state.update((state) => ({ ...state, loginStatus: 'error' }));
      },
    });
  }

  logout(): void {
    // Clear auth state
    this.state.update((state) => ({
      ...state,
      user: null,
      accessToken: null,
      refreshToken: null,
      loginStatus: 'idle',
    }));

    // Clear localStorage
    this.clearUserFromStorage();

    // Redirect to login page
    this.router.navigate(['/app/auth/login']);
  }

  // Helper methods
  getAccessToken(): string | null {
    return this.state().accessToken;
  }

  private saveUserToStorage(user: User, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private loadUserFromStorage(): void {
    try {
      const userJson = localStorage.getItem('user');
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (userJson && accessToken) {
        const user = JSON.parse(userJson);
        
        this.state.update((state) => ({
          ...state,
          user,
          accessToken,
          refreshToken,
          loginStatus: 'success',
        }));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.clearUserFromStorage();
    }
  }

  private clearUserFromStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}