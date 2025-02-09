import {Component} from '@angular/core';
import {TimelineEntry} from '@omnedia/ngx-timeline';
import {ApiService} from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-paychain-view',
  standalone: false,
  templateUrl: './paychain-view.component.html',
  styleUrl: './paychain-view.component.css'
})
export class PaychainViewComponent {
  waitlistForm: FormGroup;
  isLoading: boolean = false;
  waitlistMessage: string | undefined;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.waitlistForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  roadmapData: TimelineEntry[] = [{
    title: "<h1>February</h1>",
    content: "We focus on developing essentials features. <ul> <li>⏳ USDT support </li> <li>⏳Show current ETH price in USD</li> <li>⏳Create application to manage your transactions</li> </ul>"

  }];

  saveToWaitlist(): void {
    if (this.waitlistForm.invalid) return;
    this.isLoading = true;
    const email = this.waitlistForm.value.email;

    this.api.addToWaitlistList(email).subscribe({
      next: () => {
        this.waitlistMessage = 'Successfully joined the waitlist!';
        this.waitlistForm.reset();
      },
      error: (err) => {
        this.waitlistMessage = `${err.error.error.message}`;
        console.error('Error:', err)
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false)
    });
  }
}
