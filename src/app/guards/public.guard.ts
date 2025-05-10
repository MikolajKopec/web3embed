// public.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthStore } from '../web3embed-app/store/auth.store';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authStore.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/app/dashboard']);
    return false;
  }
}