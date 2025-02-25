import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TimelineEntry} from '@omnedia/ngx-timeline';
import {ApiService} from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnimationOptions} from 'ngx-lottie';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-paychain-view',
  standalone: false,
  templateUrl: './paychain-view.component.html',
  styleUrl: './paychain-view.component.css'
})
export class PaychainViewComponent implements OnInit{
  waitlistForm: FormGroup;
  isLoading: boolean = false;
  waitlistMessage: string | undefined;


  roadmapData: TimelineEntry[] = [{
    title: "<h1>02.2025</h1>",
    content: "We focus on developing essentials features. <ul> <li>✅ POC embeddable payment button</li> <li>✅ USDT, USDC, DAI, WETH, WBTC support </li> <li>✅Show price in USD</li>  </ul>"

  }, {
    title: "<h1>03.2025</h1>",
    content: "Last steps before Web3Checkout will be ready for first waitlisted users <ul> <li>⏳Create application to manage your transactions and processed payments</li> <li>⏳Add webhooks/email notifications on processed payment</li> </ul>"
  }, {
    title: "<h1>04.2025</h1>",
    content: "Get ready to release beta for all waitlisted people."
  }
  ];
  options: AnimationOptions = {
    path:"/lottie/blockchain-wallet.json"
  };
  isBrowser: boolean = false;
  constructor(private api: ApiService, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.waitlistForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
 ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
 }

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

  getEmailErrorMessage(): string {
    const emailControl = this.waitlistForm.get('email');

    if (emailControl?.hasError('required')) {
      return 'Email is required.';
    } else if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }
}
