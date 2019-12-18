import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  constructor(private httpClient: HttpClient) { }

  getIncident() {
    return this.httpClient.get<[]>('https://us-central1-dev-tritronik.cloudfunctions.net/spasi-alert-management/incident?limit=99999');
  }
}