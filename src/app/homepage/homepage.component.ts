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
  title = 'Coflow';
  options: AnimationOptions = {
    path: "/lottie/blockchain-wallet.json"
  };
  isBrowser: boolean = false;
  constructor(private router: Router, private titleService: Title, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root);
        this.titleService.setTitle(title);
      });
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