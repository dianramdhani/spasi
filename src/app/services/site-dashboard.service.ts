import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteDashboardService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  getSiteById(
    siteId: string,
    assetName: 'Rectifier Detail' | 'Rectifier Summary' | 'Battery Detail' | 'Battery Summary' | 'AC PLN'
  ) {
    return this.httpClient.get<SiteDashboard[]>(`${this.url}/siteDashboard/sites/${siteId}/asset/name/${assetName}`);
  }
}

class AssetPropertyData {
  deviceId: string
  dataTime: string
  assetPropertyId: string
  sensorPropertyId: string
  propertyName: string
  value: string
  unitOfMeasurement: string
}

export class SiteDashboard {
  groupName: string
  assetPropertyDatas: AssetPropertyData[]
  lastDataTime: string
}