import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  title = 'web3embed';
  options: AnimationOptions = {
    path: "/lottie/blockchain-wallet.json"
  };
  isBrowser: boolean = false;

  // FAQ accordion state
  faqOpen: boolean[] = [];
  faqs: any[] = [
    { question: 'Do I need to understand blockchain technology to use this service?' },
    { question: 'How does the Supabase integration work?' },
    { question: 'What cryptocurrencies and networks can be accepted with Web3Checkout?' },
    { question: 'How does payment verification work?' },
    { question: 'How does the offer system work?' },
    { question: 'How does the notification system work?' },
    { question: 'Is MetaMask the only wallet supported?' },
    { question: 'Can I customize the payment component to match my brand?' },
    { question: 'How does billing work?' },
    { question: 'What support options are available?' },
    { question: 'Do you offer custom integrations?' }
  ];

  constructor(private router: Router, private titleService: Title, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root);
        this.titleService.setTitle(title);
      });
    // Initialize all FAQs as closed
    this.faqOpen = this.faqs.map(() => false);
  }

  toggleFaq(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }
  getTitle(state: any, parent: any): string {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data.join('');
  }
}