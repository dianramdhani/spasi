import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketingService {
  constructor(private httpClient: HttpClient) { }

  getIncident() {
    return this.httpClient.get<[]>('https://us-central1-dev-tritronik.cloudfunctions.net/spasi-alert-management/incident?limit=99999');
  }

  putIncident(incident_id: string, message: string) {
    return this.httpClient.put(`https://us-central1-dev-tritronik.cloudfunctions.net/spasi-alert-management/incident/${incident_id}/resolve`, { message });
  }

  getIncidentBySiteId(site_id: string) {
    const params = new HttpParams()
      .set('limit', '9999')
      .set('site_id', site_id)
      .set('state', 'open');
    return this.httpClient.get<[]>('https://us-central1-dev-tritronik.cloudfunctions.net/spasi-alert-management/incident', { params });
  }
}