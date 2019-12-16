import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, Map, icon, marker } from 'leaflet';
import { BehaviorSubject } from 'rxjs';

import { SiteManagementService, SiteResponse, AssetManagementService } from 'src/app/services';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-site-profile',
  templateUrl: './site-profile.component.html',
  styleUrls: ['./site-profile.component.scss']
})
export class SiteProfileComponent implements OnInit {
  site = {
    id: '',
    name: '',
    region: '',
    type: '',
    latitude: 0,
    longitude: 0,
    status: '',
    assets: []
  };
  mapOptions = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };
  lastMarkerPoint = new BehaviorSubject({ latitude: 0, longitude: 0 });

  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private assetManagementService: AssetManagementService,
  ) { }

  async ngOnInit() {
    const siteId = this.route.snapshot.params.siteId,
      site = await this.siteManagementService.getSiteById(siteId).toPromise();
    this.site = Object.assign(this.site, site);

    this.site.assets = await this.siteManagementService.getAssetBySite(this.site.id).toPromise();
    for (const i in this.site.assets) {
      const asset = this.site.assets[i],
        properties = await this.assetManagementService.getPropertyByAsset(asset.id).toPromise();
      this.site.assets[i] = Object.assign(asset, { properties });
    }

    this.lastMarkerPoint.next({ latitude: this.site.latitude, longitude: this.site.longitude });
  }

  onMapReady(map: Map) {
    const markerMap = marker(latLng(0, 0), {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-warning.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
      })
    });
    markerMap.addTo(map);

    this.lastMarkerPoint.subscribe(({ latitude, longitude }) => {
      const location = latLng(latitude, longitude);
      markerMap.setLatLng(location);
      map.panTo(location);
    });
  }
}