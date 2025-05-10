import { Injectable, inject, signal, computed, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly router = inject(Router);


  supabase!: ReturnType<typeof createClient>

  constructor() {
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => {
        this.supabase = createClient(
          'https://hyqvljltfkppuiqlwjzo.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cXZsamx0ZmtwcHVpcWx3anpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3Nzg4MjIsImV4cCI6MjA1NDM1NDgyMn0.3uQ7e-j1wl03YxPMY1o809GhkUqXELEE16qtJWSOxKk'
        )
      })
  }
  private readonly _user = signal<User | null>(null);
  private readonly _accessToken = signal<string | null>(null);
  private readonly _loginStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  readonly user = computed(() => this._user());
  readonly accessToken = computed(() => this._accessToken());
  readonly loginStatus = computed(() => this._loginStatus());
  readonly isLoggedIn = computed(() => !!this._accessToken());
  getAccessToken(): string | null {
    return this._accessToken();
  }
  
  async login(email: string, password: string) {
    this._loginStatus.set('loading');
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    
    if (error || !data.session) {
      this._user.set(null);
      this._accessToken.set(null);
      this._loginStatus.set('error');
      return;
    }
    this._user.set(data.session.user);
    this._accessToken.set(data.session.access_token);
    this._loginStatus.set('success');

    localStorage.setItem('access_token', data.session.access_token);
    localStorage.setItem('user', JSON.stringify(data.session.user));

    this.router.navigate(['/app/dashboard']);
  }

  logout() {
    this.supabase.auth.signOut();
    this._user.set(null);
    this._accessToken.set(null);
    this._loginStatus.set('idle');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/app/auth/login']);
  }

  async restoreFromSession() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session) {
      // this._user.set(data.session.user);
      this._accessToken.set(data.session.access_token);
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('user', JSON.stringify(data.session.user));
    }
  }

  getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }
} 
