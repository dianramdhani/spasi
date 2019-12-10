import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, marker, icon, featureGroup, Marker } from 'leaflet';

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
  dangers: Device[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.dangers = this.alertService.getDanger();
  }

  onMapReady(map: Map) {
    this.map = map;
    const markers = this.dangers.map(danger => marker(latLng(danger.position.lat, danger.position.lng), this.markerIcon.normal)),
      layer = featureGroup(markers);
    this.map.addLayer(layer);
    this.map.fitBounds(layer.getBounds());
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