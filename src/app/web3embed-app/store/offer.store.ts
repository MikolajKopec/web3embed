import { Injectable, inject } from "@angular/core";
import { computed, signal } from "@angular/core";
import { ApiService } from "../services/api.service";
import { OfferResponse } from "../interfaces/offer.interface";
@Injectable({ providedIn: 'root' })
export class OfferStore {
    apiService = inject(ApiService);
    private readonly _offers = signal<OfferResponse[]>([]);
    readonly offers = computed(() => this._offers());

    loadOffers() {
        this.apiService.getOffers().subscribe({
            next: (offers: OfferResponse[]) => {
                console.log(offers);
                this._offers.set(offers);
            },
            error: (error) => {
                console.error('Error loading offers:', error);
            }
        });
    }
}