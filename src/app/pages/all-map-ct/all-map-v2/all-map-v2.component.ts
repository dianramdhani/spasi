import { Component, OnInit, NgZone } from '@angular/core';
import { tileLayer, latLng, Map, marker, icon, featureGroup, Marker, FeatureGroup } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { AlertService, Device } from 'src/app/services/alert.service';

import { ModalDetailV2Component } from './modal-detail-v2/modal-detail-v2.component';

@Component({
  selector: 'app-all-map-v2',
  templateUrl: './all-map-v2.component.html',
  styleUrls: ['./all-map-v2.component.scss']
})
export class AllMapV2Component implements OnInit {
  // map
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
      }),
      opacity: 0.6
    }
  };
  focusMarker: Marker;
  lastLayer: FeatureGroup;

  // alerts
  dangers: Device[];
  warnings: Device[];
  normals: Device[];

  // Pie
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ['Open', 'Resolve', 'Closed'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.4)', 'rgba(0,255,0,0.4)', 'rgba(0,0,255,0.4)'],
    },
  ];

  constructor(private alertService: AlertService, private zone: NgZone, private modal: NgbModal) { }

  ngOnInit() {
    this.dangers = this.alertService.getDangers();
    this.warnings = this.alertService.getWarnings();
    this.normals = this.alertService.getNormals();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.updateLayer(this.dangers, this.markerIcon.danger);
  }

  updateLayer(devices: Device[], markerIcon) {
    if (this.lastLayer) {
      this.lastLayer.removeFrom(this.map);
    }
    const markers = devices.map(device => {
      const _marker = marker(latLng(device.position.lat, device.position.lng), markerIcon);
      _marker.addEventListener('click', () => this.zone.run(() => this.openModalDetail(device)));
      return _marker;
    });
    this.lastLayer = featureGroup(markers);
    this.lastLayer.addTo(this.map);
    this.map.fitBounds(this.lastLayer.getBounds());
  }

  openModalDetail(device: Device, event = null) {
    console.log('detail', device);
    this.focusTo(device);
    this.modal.open(ModalDetailV2Component);
  }

  focusTo(device: Device, event = null) {
    if (this.focusMarker) {
      this.focusMarker.removeFrom(this.map);
    }
    const latlng = latLng(device.position.lat, device.position.lng);
    this.map.panTo(latlng);
    this.focusMarker = marker(latlng, this.markerIcon.focus);
    this.focusMarker.addEventListener('click', () => this.zone.run(() => this.openModalDetail(device)));
    this.focusMarker.addTo(this.map);
  }
}