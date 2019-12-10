import { Component, NgZone } from '@angular/core';
import { tileLayer, latLng, Map, marker, icon } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalDetailComponent } from './modal-detail/modal-detail.component';

@Component({
  selector: 'app-all-map',
  templateUrl: './all-map.component.html',
  styleUrls: ['./all-map.component.scss']
})
export class AllMapComponent {
  options = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    zoom: 13,
    center: latLng(-6.8794222, 107.5386812)
  };
  markerIcon = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };
  map: Map;

  constructor(private modalService: NgbModal, private zone: NgZone) { }

  onMapReady(map: Map) {
    this.map = map;

    const marker1 = marker(latLng(-6.8794222, 107.5386812), this.markerIcon);
    marker1.addEventListener('click', () => {
      console.log('ini marker1');
    });
    marker1.addTo(this.map);

    const marker2 = marker(latLng(-6.879337, 106.5386812), this.markerIcon);
    marker2.addEventListener('click', () => {
      console.log('ini marker2');
      this.zone.run(() => this.openModalDetail());
    });
    marker2.addTo(this.map);
  }

  openModalDetail() {
    this.modalService.open(ModalDetailComponent);
  }
}