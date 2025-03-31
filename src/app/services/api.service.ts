import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }
  addToWaitlistList(email:string){
    return this.httpClient.post(`${environment.apiUrl}/mailing/waitlist`,{email}, {headers})
  }

}
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});
