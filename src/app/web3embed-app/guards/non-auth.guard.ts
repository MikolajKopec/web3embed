import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Add console log for debugging
  console.log('nonAuthGuard check - isLoggedIn:', authStore.isLoggedIn());

  if (!authStore.isLoggedIn()) {
    return true;
  }

  // If user is already logged in, redirect to dashboard
  router.navigate(['/app/dashboard']);
  return false;
};