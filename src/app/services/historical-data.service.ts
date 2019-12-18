import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  /**
   * Get data device by asset property id and range date.
   * @param minDataTime - Minimum date on range data.
   * @param maxDataTime - Maximum date on range data.
   */
  getDataDevicesByAssetPropertyAndTime(assetPropertyId: string, minDataTime: Moment, maxDataTime: Moment) {
    return this.httpClient.get<DataDevicesResponse[]>(`${this.url}/historicalData/assetProperty/${assetPropertyId}/minDataTime/${minDataTime.format('YYYY-MM-DD HH:mm:ss')}/maxDataTime/${maxDataTime.format('YYYY-MM-DD HH:mm:ss')}`);
  }
}

interface DataDevicesResponse {
  entryId: number
  deviceId: string
  dataTimeStr: string
  dataTime: string
  sensorName: string
  sensorConfig: string
  sensorParam: string
  subparamName: string
  subparamValue: string
}