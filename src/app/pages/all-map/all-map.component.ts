import { Component } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-all-map',
  templateUrl: './all-map.component.html',
  styleUrls: ['./all-map.component.scss']
})
export class AllMapComponent {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 13 })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
}