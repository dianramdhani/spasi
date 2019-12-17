import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceManagementService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  /**
   * Get all devices.
   */
  getDeviceAll() {
    return this.httpClient.get<DeviceResponse[]>(`${this.url}/deviceManagement/devices`);
  }

  /**
   * Get sensor.
   * @param deviceId - Device id.
   */
  getSensorByDeviceId(deviceId: string) {
    return this.httpClient.get<SensorResponse[]>(`${this.url}/deviceManagement/devices/${deviceId}/sensors`);
  }

  /**
   * Get sensor property by sensor id.
   * @param sensorId - Sensor id.
   */
  getSensorPropertBySensorId(sensorId: string) {
    return this.httpClient.get<SensorPropertiesResponse[]>(`${this.url}/deviceManagement/sensors/${encodeURIComponent(sensorId)}/sensorProperties`);
  }

  /**
   * Get device configurations by asset property id.
   * @param assetPropertyId - Asset property id.
   */
  getDeviceConfigurationsBy(assetPropertyId) {
    return this.httpClient.get(`${this.url}/deviceManagement/deviceConfigurations/assetProperty/${assetPropertyId}`);
  }
}

export interface DeviceResponse {
  id: string,
  name: string,
  siteId: string,
  type: string,
  online: boolean,
  sensors: SensorResponse[]
}

export interface SensorResponse {
  id: string,
  name: string,
  deviceId: string,
  config: string,
  param: string,
  sensorProperties: SensorPropertiesResponse[]
}

export interface SensorPropertiesResponse {
  id: string,
  name: string,
  sensorId: string,
  valueType: string,
  unitOfMeasurement: string
}