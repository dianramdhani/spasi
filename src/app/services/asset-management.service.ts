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
    return this.httpClient.get<PropertyResponse[]>(`${this.url}/assetManagement/assets/${assetId}/properties`);
  }

  /**
   * Create mapping betwen sensor and asset property.
   * @param assetPropertyId - Asset property id.
   * @param sensorPropertyId - Sensor property id (sub parameter sensor).
   */
  createAssetPropertyMapping(assetPropertyId: string, sensorPropertyId: string) {
    return this.httpClient.post(`${this.url}/assetManagement/assets/sensors/properties/mapping`, { assetPropertyId, sensorPropertyId, id: 0 });
  }

  /**
   * Get array of group name by asset.
   * @param assetId - Assety id.
   */
  getPropertyGroupByAsset(assetId: string) {
    return this.httpClient.get<string[]>(`${this.url}/assetManagement/assets/${assetId}/properties/group`);
  }

  /**
   * Get Property by grouping name.
   * @param assetId - Asset id.
   * @param propertyGroup - Property group string from getPropertyGroupByAsset.
   */
  getPropertyByAssetAndGroup(assetId: string, propertyGroup: string) {
    return this.httpClient.get<PropertyByAssetAndGroupResponse[]>(`${this.url}/assetManagement/assets/${assetId}/properties/group/${propertyGroup}`);
  }
}

export interface AssetResponse {
  id: string,
  name: string,
  siteId: string,
  type: string,
  image: string
}

export class PropertyResponse {
  id: string
  name: string
  assetId: string
  type: string
  value: any
  valueType: string
}

export class PropertyByAssetAndGroupResponse extends PropertyResponse {
  propertyGroup: string
}