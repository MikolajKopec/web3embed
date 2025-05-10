import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { AuthStore } from '../store/auth.store';
import { Observable } from 'rxjs';
import { OfferResponse } from '../interfaces/offer.interface';
@Injectable({ providedIn: 'root' })
export class ApiService {
  authStore = inject(AuthStore);
  constructor(private httpClient: HttpClient) {
  }

  getOffers(): Observable<OfferResponse[]>{
    return this.httpClient.get<OfferResponse[]>(`${environment.apiUrl}/offers`)
  }


}
