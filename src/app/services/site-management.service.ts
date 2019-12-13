import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteManagementService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  /**
   * Get site type for form site.
   */
  getSiteType() {
    return this.httpClient.get(`${this.url}/siteManagement/sites/type`);
  }

  /**
   * Create site.
   * @param name - Site name.
   * @param type - Site type.
   * @param latitude - Latitude location.
   * @param longitude - Longitude location.
   * @param region - Region of site.
   */
  createSite(name: string, type: string, latitude: number, longitude: number, region: string) {
    return this.httpClient.post<any>(`${this.url}/siteManagement/sites`, { name, type, latitude, longitude, region, status: 'NORMAL' });
  }
}