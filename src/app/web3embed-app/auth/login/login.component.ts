// login.component.ts
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  showPassword = false;
  loading = false;
  error = '';

  constructor() {
    effect(() => {
      const status = this.authStore.loginStatus();
      if (status === 'success') {
        this.loading = false;
        this.router.navigate(['/app/dashboard']);
      } else if (status === 'error') {
        this.loading = false;
        this.error = 'Invalid credentials';
      } else if (status === 'loading') {
        this.loading = true;
      }
    });
  }

  ngOnInit(): void {
    // Check if already logged in
    if (this.authStore.isLoggedIn()) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;
    this.authStore.login(email, password);
  }
}