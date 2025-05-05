import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
  }

  // Register new user
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  // Logout user
  logout(): Observable<any> {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Call logout endpoint to invalidate token on server
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {});
  }

  // Check if email already exists
  checkEmailExists(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/check-email`, { email });
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get current user
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}