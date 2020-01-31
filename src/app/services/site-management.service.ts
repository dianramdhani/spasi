import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AssetResponse } from './asset-management.service';
import { Observable } from 'rxjs';

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
    return this.httpClient.post<SiteResponse>(`${this.url}/siteManagement/sites`, { name, type, latitude, longitude, region, status: 'NORMAL' });
  }

  /**
   * Get all site.
   */
  getSiteAll() {
    return this.httpClient.get<SiteResponse[]>(`${this.url}/siteManagement/sites`);
  }

  /**
   * Get site data by site id.
   * @param siteId - Site id.
   */
  getSiteById(siteId: string) {
    return this.httpClient.get<SiteResponse>(`${this.url}/siteManagement/sites/${siteId}`);
  }

  /**
   * Get all asset by site id.
   * @param siteId - Site id.
   */
  getAssetBySite(siteId: string) {
    return this.httpClient.get<AssetResponse[]>(`${this.url}/siteManagement/sites/${siteId}/asset`);
  }

  /**
   * Get site by region.
   * @param region - Region.
   */
  getSiteByRegion(region: string) {
    return this.httpClient.get<SiteResponse[]>(`${this.url}/siteManagement/sites/region/${region}`);
  }


  getSiteByUser(username: string): Observable<SiteResponse> {
    return this.httpClient.get<SiteResponse>(`${this.url}/siteManagement/sites/user/${username}`)
      .pipe(
        map(sites => sites[0])
      );
  }
}

export interface SiteResponse {
  id: string,
  name: string,
  region: string,
  status: string,
  type: string,
  longitude: number,
  latitude: number
}