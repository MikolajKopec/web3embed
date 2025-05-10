// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthStore } from '../web3embed-app/store/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authStore.isLoggedIn()) {
      return true;
    }

    // User is not logged in, redirect to login page
    this.router.navigate(['/app/auth/login']);
    return false;
  }
} 