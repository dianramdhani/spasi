import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, marker, icon, featureGroup, Marker, FeatureGroup } from 'leaflet';

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
    danger: {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-danger.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
      })
    },
    warning: {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-warning.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
      })
    },
    normal: {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-normal.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
      })
    },
    focus: {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-focus.png',
      })
    }
  };
  focusMarker: Marker;
  lastLayer: FeatureGroup;

  dangers: Device[];
  warnings: Device[];
  normals: Device[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // sample from dangers
    this.dangers = this.alertService.getDangers();
    this.warnings = this.alertService.getDangers();
    this.normals = this.alertService.getDangers();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.updateLayer(this.dangers, this.markerIcon.danger);
  }

  updateLayer(devices: Device[], markerIcon) {
    if (this.lastLayer) {
      this.lastLayer.removeFrom(this.map);
    }
    const markers = devices.map(device => marker(latLng(device.position.lat, device.position.lng), markerIcon));
    this.lastLayer = featureGroup(markers);
    this.lastLayer.addTo(this.map);
    this.map.fitBounds(this.lastLayer.getBounds());
  }

  focusTo(event, device: Device) {
    if (this.focusMarker) {
      this.focusMarker.removeFrom(this.map);
    }
    const latlng = latLng(device.position.lat, device.position.lng);
    this.map.panTo(latlng);
    this.focusMarker = marker(latlng, Object.assign(this.markerIcon.focus, { opacity: 0.6 }));
    this.focusMarker.addTo(this.map);
  }
}