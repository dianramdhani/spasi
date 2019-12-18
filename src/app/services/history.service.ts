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

  public getData(assetPropertyId, minDataTime, maxDataTime) {
    return this.httpClient.get<any>(`${this.url}/historicalData/assetProperty/${assetPropertyId}/minDataTime/${minDataTime}/maxDataTime/${maxDataTime}`);
  }
}