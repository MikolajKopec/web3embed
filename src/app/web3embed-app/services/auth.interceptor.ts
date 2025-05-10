// auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authStore.getAccessToken();

    // Skip adding the token for public endpoints
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/waitlist')) {
      return next.handle(req);
    }

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Handle authentication errors
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token has expired or is invalid
            this.authStore.logout();
            this.router.navigate(['/app/auth/login']);
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}