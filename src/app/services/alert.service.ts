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
        site: 'Site Danger 1',
        suggestAction: 'Suggest 1'
      },
      {
        position: { lat: -6.892688, lng: 107.6181923 },
        site: 'Site Danger 2',
        suggestAction: 'Suggest 2'
      },
      {
        position: { lat: -6.880897, lng: 107.6266693 },
        site: 'Site Danger 3',
        suggestAction: 'Suggest 3'
      }
    ];
  }

  getWarnings(): Device[] {
    return [
      {
        position: { lat: -6.876269, lng: 107.5298403 },
        site: 'Site Warning 1',
        suggestAction: 'Suggest 1'
      },
      {
        position: { lat: -6.875257, lng: 107.5265363 },
        site: 'Site Warning 2',
        suggestAction: 'Suggest 2'
      },
      {
        position: { lat: -6.874969, lng: 107.5252493 },
        site: 'Site Warning 3',
        suggestAction: 'Suggest 3'
      },
      {
        position: { lat: -6.873467, lng: 107.5204963 },
        site: 'Site Warning 4',
        suggestAction: 'Suggest 4'
      }
    ]
  }

  getNormals(): Device[] {
    return [
      {
        position: { lat: -6.880897, lng: 107.6266693 },
        site: 'Site Normal 1',
        suggestAction: 'Suggest 1'
      },
      {
        position: { lat: -6.875257, lng: 107.5265363 },
        site: 'Site Normal 2',
        suggestAction: 'Suggest 2'
      },
      {
        position: { lat: -6.880897, lng: 107.5204963 },
        site: 'Site Normal 3',
        suggestAction: 'Suggest 3'
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