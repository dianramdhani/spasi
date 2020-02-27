import { Injectable } from '@angular/core';
import { Node } from 'angular-tree-search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  public getData(assetPropertyId: string, minDataTime: string, maxDataTime: string) {
    return this.httpClient.get<History[]>(`${this.url}/historicalData/assetProperty/${assetPropertyId}/minDataTime/${minDataTime}/maxDataTime/${maxDataTime}`);
  }
}

export class History {
  entryId: number;
  deviceId: string;
  dataTimeStr: string;
  dataTime: string;
  sensorName: string;
  sensorConfig: string;
  sensorParam: string;
  subparamName: string;
  subparamValue: string;
}