import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetManagementService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  /**
   * Create asset of site.
   * @param siteId - Id response after create site.
   * @param name - Name of asset.
   */
  createAsset(siteId: string, name: string) {
    return this.httpClient.post<AssetResponse>(`${this.url}/assetManagement/assets`, { siteId, name });
  }

  /**
   * Create property of asset.
   * @param assetId - Id response after createAsset.
   * @param name - Property name.
   * @param valueType - Unit of property.
   */
  createAssetProperty(assetId: string, name: string, valueType: string) {
    return this.httpClient.post(`${this.url}/assetManagement/assets/properties`, { assetId, name, valueType });
  }

  /**
   * Get property by asset id.
   * @param assetId - Asset id.
   */
  getPropertyByAsset(assetId: string) {
    return this.httpClient.get(`${this.url}/assetManagement/assets/${assetId}/properties`);
  }

  /**
   * Create mapping betwen sensor and asset property.
   * @param assetPropertyId - Asset property id.
   * @param sensorPropertyId - Sensor property id (sub parameter sensor).
   */
  createAssetPropertyMapping(assetPropertyId: string, sensorPropertyId: string) {
    return this.httpClient.post(`${this.url}/assetManagement/assets/sensors/properties/mapping`, { assetPropertyId, sensorPropertyId, id: 0 });
  }
}

export interface AssetResponse {
  id: string,
  name: string,
  siteId: string,
  type: string
}