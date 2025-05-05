import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:false
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  showPasswordRepeat = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      passwordRepeat: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      privacy: [false, Validators.requiredTrue],
      updates: [false]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('passwordRepeat')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'passwordRepeat') {
      this.showPasswordRepeat = !this.showPasswordRepeat;
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.error = '';
    
    const userData = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      accept_terms: this.registerForm.value.terms,
      accept_privacy: this.registerForm.value.privacy,
      subscribe_updates: this.registerForm.value.updates
    };
    
    this.authService.register(userData).subscribe({
      next: () => {
        this.loading = false;
        // Redirect to login page with success message
        this.router.navigate(['auth/login'], { 
          queryParams: { registered: 'success' } 
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.detail || 'Registration failed. Please try again later.';
      }
    });
  }
}