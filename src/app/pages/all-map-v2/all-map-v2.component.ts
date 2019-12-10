import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-all-map-v2',
  templateUrl: './all-map-v2.component.html',
  styleUrls: ['./all-map-v2.component.scss']
})
export class AllMapV2Component implements OnInit {
  options = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    zoom: 13,
    center: latLng(-6.8794222, 107.5386812)
  };

  constructor() { }

  ngOnInit() {
  }
}