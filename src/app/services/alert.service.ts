import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  getDangers(): Device[] {
    return [
      {
        position: { lat: -6.8973318, lng: 107.6096949 },
        site: 'Site 1',
        suggestAction: 'Suggest 1'
      },
      {
        position: { lat: -6.892688, lng: 107.6181923 },
        site: 'Site 2',
        suggestAction: 'Suggest 2'
      },
      {
        position: { lat: -6.880897, lng: 107.6266693 },
        site: 'Site 3',
        suggestAction: 'Suggest 3'
      }
    ];
  }
}

export interface Device {
  position: {
    lat: number,
    lng: number
  },
  site: string,
  suggestAction?: string
}