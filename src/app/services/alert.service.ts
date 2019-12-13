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
        site: 'BTSH Bandung 1',
        suggestAction: 'High Temperature'
      },
      {
        position: { lat: -6.892688, lng: 107.6181923 },
        site: 'BTSH Cianjur 2',
        suggestAction: 'Low Voltage'
      },
      {
        position: { lat: -6.880897, lng: 107.6266693 },
        site: 'IPLH Tasikmalaya',
        suggestAction: 'Empty Fuel Tank'
      }
    ];
  }

  getWarnings(): Device[] {
    return [
      {
        position: { lat: -6.876269, lng: 107.5298403 },
        site: 'BTSP Banda Aceh 1',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: -6.875257, lng: 107.5265363 },
        site: 'PAK Makasar',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: -6.874969, lng: 107.5252493 },
        site: 'BTSP Merauke',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: -6.873467, lng: 107.5204963 },
        site: 'PAK Ternate',
        suggestAction: 'Warning Temperature'
      }
    ]
  }

  getNormals(): Device[] {
    return [
      {
        position: { lat: -6.880897, lng: 107.6266693 },
        site: 'Site Normal 1',
      },
      {
        position: { lat: -6.875257, lng: 107.5265363 },
        site: 'Site Normal 2',
      },
      {
        position: { lat: -6.880897, lng: 107.5204963 },
        site: 'Site Normal 3',
      }
    ]
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