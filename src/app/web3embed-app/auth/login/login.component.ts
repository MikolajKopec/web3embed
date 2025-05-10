import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  showPassword = false;
  loading = false;
  error = '';
  returnUrl: string = '/app/dashboard';

  constructor() {
    // Get return url from route parameters or default to '/app/dashboard'
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/app/dashboard';
    });

    effect(() => {
      const status = this.authStore.loginStatus();
      if (status === 'success') {
        this.loading = false;
        this.router.navigateByUrl(this.returnUrl);
      } else if (status === 'error') {
        this.loading = false;
        this.error = 'Invalid credentials';
      } else if (status === 'loading') {
        this.loading = true;
      }
    });
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