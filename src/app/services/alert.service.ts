import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  getDangers(): Device[] {
    return [
      {
        position: { lat: -6.917464, lng: 107.619125 },
        site: 'BTSH Bandung 1',
        suggestAction: 'High Temperature'
      },
      {
        position: { lat: -7.357977, lng: 107.195717 },
        site: 'BTSH Cianjur 2',
        suggestAction: 'Low Voltage'
      },
      {
        position: { lat: -7.350581, lng: 108.217163 },
        site: 'IPLH Tasikmalaya',
        suggestAction: 'Empty Fuel Tank'
      }
    ];
  }

  getWarnings(): Device[] {
    return [
      {
        position: { lat: 5.548290, lng: 95.323753 },
        site: 'BTSP Banda Aceh 1',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: -5.147665, lng: 119.432732 },
        site: 'PAK Makasar',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: -8.528460, lng: 140.540375 },
        site: 'BTSP Merauke',
        suggestAction: 'Warning Temperature'
      },
      {
        position: { lat: 0.785560, lng: 127.380829 },
        site: 'PAK Ternate',
        suggestAction: 'Warning Temperature'
      }
    ]
  }

  getNormals(): Device[] {
    return [
      {
        position: { lat: -6.175110, lng: 106.865036 },
        site: 'PAK Jakarta',
      },
      {
        position: { lat: -3.625530, lng: 128.105453 },
        site: 'BTSH Ambon',
      },
      {
        position: { lat: -0.303090, lng: 100.367610 },
        site: 'BTSH Bukittinggi',
      },
      {
        position: { lat: -8.670458, lng: 115.212631 },
        site: 'IPLH Denpasar',
      },
      {
        position: { lat: 0.668000, lng: 117.544739 },
        site: 'PAK Kutai',
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