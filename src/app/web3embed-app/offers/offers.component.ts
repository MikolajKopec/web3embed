import { Component } from '@angular/core';
import { OfferStore } from '../store/offer.store';
import { inject } from '@angular/core';
@Component({
  selector: 'app-offers',
  standalone: false,
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
    offerStore = inject(OfferStore);
    constructor() {
        this.offerStore.loadOffers();
    }
}
