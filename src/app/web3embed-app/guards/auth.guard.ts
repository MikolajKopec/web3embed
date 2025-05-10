import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isLoggedIn()) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  const redirectUrl = state.url;
  
  // Navigate to the login page with extras
  router.navigate(['/app/auth/login'], {
    queryParams: { returnUrl: redirectUrl }
  });
  
  return false;
};