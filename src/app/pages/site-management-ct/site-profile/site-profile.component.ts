import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tileLayer, latLng, Map, icon, marker } from 'leaflet';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import * as moment from 'moment';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { SiteManagementService, SiteResponse, AssetManagementService, DeviceManagementService, PropertyResponse } from 'src/app/services';
import { HistoricalDataService } from 'src/app/services/historical-data.service';
import { tap } from 'rxjs/operators';
import { formatNumber } from '@angular/common';

@AutoUnsubscribe()
@Component({
  selector: 'app-site-profile',
  templateUrl: './site-profile.component.html',
  styleUrls: ['./site-profile.component.scss']
})
export class SiteProfileComponent implements OnInit, OnDestroy {
  site = {
    id: '',
    name: '',
    region: '',
    type: '',
    latitude: 0,
    longitude: 0,
    status: '',
    assets: [],
    lastConnected: ''
  };
  mapOptions = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };
  lastMarkerPoint = new BehaviorSubject({ latitude: 0, longitude: 0 });
  dataTimer: Subscription;
  readonly lastMinuteData = 5;

  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private assetManagementService: AssetManagementService,
    private historicalDataService: HistoricalDataService,
    private deviceManagementService: DeviceManagementService
  ) { }

  async ngOnInit() {
    /**
     * test historical data
     * @todo observable date timeout
     */

    const siteId = this.route.snapshot.params.siteId,
      site = await this.siteManagementService.getSiteById(siteId).toPromise();
    this.site = Object.assign(this.site, site);

    this.site.assets = await this.siteManagementService.getAssetBySite(this.site.id).toPromise();
    this.lastMarkerPoint.next({ latitude: this.site.latitude, longitude: this.site.longitude });

    const deviceInterval = timer(0, 120000);
    this.dataTimer = deviceInterval.pipe(
      tap(async () => {
        // set 1 hari
        const minDateTime = moment().subtract(1, 'd'),
          maxDateTime = moment();

        for (const i in this.site.assets) {
          const asset = this.site.assets[i],
            properties = await this.assetManagementService.getPropertyByAsset(asset.id).toPromise();

          for (const j in properties) {
            const property = properties[j],
              hasDevice = (await this.deviceManagementService.getDeviceConfigurationsBy(property.id).toPromise()).deviceId !== '' ? true : false;
            if (hasDevice) {
              const values = await this.historicalDataService.getDataDevicesByAssetPropertyAndTime(property.id, minDateTime, maxDateTime).toPromise();
              if (values.length !== 0) {
                property.value = values[values.length - 1];
              }
            } else {
              property.value = '?';
            }
            properties[j] = property;
          }

          this.site.assets[i] = Object.assign(asset, { properties });
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {

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

  deviceValueGenerator(property: PropertyResponse) {
    let isBefore = false;
    if (property.value !== null) {
      const timeData = moment(moment.utc(property.value.dataTime).format('YYYY-MM-DD HH:mm')),
        timeCompare = moment().subtract(this.lastMinuteData, 'minute');
      isBefore = !timeCompare.isBefore(timeData);
    }

    return {
      value: property.value === null ? 'null' : property.value === '?' ? '?' : formatNumber(+property.value.subparamValue, 'en', '.0-2'),
      title: property.value === null ? 'Data not update.' : property.value === '?' ? 'Device not connected.' : moment.utc(property.value.dataTime).format('YYYY-MM-DD HH:mm'),
      isBefore
    }
  }
}