import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  private apiUrl = environment.apiUrl + '/waitlist/waiting-list';

  constructor(private http: HttpClient) {}

  joinWaitlist(data: { email: string; name?: string; interest?: string; campaign_id?: string }): Observable<any> {
    // The backend expects at least email, and optionally name, interest, and campaign_id
    return this.http.post<any>(this.apiUrl, data);
  }
}
