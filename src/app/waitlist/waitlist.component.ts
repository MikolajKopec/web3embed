import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaitlistService } from './waitlist.service';

@Component({
  selector: 'app-waitlist',
  standalone: false,
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.css'
})
export class WaitlistComponent {
  waitlistForm: FormGroup;
  submitted = false;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private waitlistService: WaitlistService) {
    this.waitlistForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      interest: [''],
      updates: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.message = null;
    this.error = null;
    if (this.waitlistForm.valid) {
      const formValue = this.waitlistForm.value;
      // Prepare payload, add campaign_id if needed
      const payload: any = {
        email: formValue.email,
        name: formValue.name,
        interest: formValue.interest
        // campaign_id: 'your_campaign_id' // Add if required by backend
      };
      this.waitlistService.joinWaitlist(payload).subscribe({
        next: (res) => {
          this.message = 'Successfully joined the waitlist!';
          this.waitlistForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          this.error = err?.error?.detail || 'Failed to join the waitlist.';
        }
      });
    }
  }
}
