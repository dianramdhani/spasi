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
   * Get site type.
   */
  getSiteType() {
    return this.httpClient.get<string[]>(`${this.url}/siteManagement/sites/type`);
  }

  /**
   * Get all region.
   */
  getRegionAll() {
    return this.httpClient.get<string[]>(`${this.url}/siteManagement/regions`);
  }

  /**
   * Create site.
   * @param name - Site name.
   * @param type - Site type from getSiteType.
   * @param latitude - Latitude location.
   * @param longitude - Longitude location.
   * @param region - Region of site from getRegionAll.
   */
  createSite(name: string, type: string, latitude: number, longitude: number, region: string) {
    return this.httpClient.post<any>(`${this.url}/siteManagement/sites`, { name, type, latitude, longitude, region, status: 'NORMAL' });
  }
}