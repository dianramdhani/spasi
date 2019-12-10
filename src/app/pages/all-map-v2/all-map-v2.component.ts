import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, marker, layerGroup, icon, featureGroup } from 'leaflet';

import { AlertService, Device } from 'src/app/services/alert.service';

@Component({
  selector: 'app-all-map-v2',
  templateUrl: './all-map-v2.component.html',
  styleUrls: ['./all-map-v2.component.scss']
})
export class AllMapV2Component implements OnInit {
  options = { layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') };
  map: Map;
  markerIcon = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };
  dangers: Device[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.dangers = this.alertService.getDanger();
  }

  onMapReady(map: Map) {
    this.map = map;
    const markers = this.dangers.map(danger => marker(latLng(danger.position.lat, danger.position.lng), this.markerIcon)),
      layer = featureGroup(markers);
    this.map.addLayer(layer);
    this.map.fitBounds(layer.getBounds());
  }

  focusTo(event, device: Device) {
    this.map.panTo(latLng(device.position.lat, device.position.lng));
  }
}