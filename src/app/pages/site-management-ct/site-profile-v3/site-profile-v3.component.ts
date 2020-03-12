import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { formatNumber } from '@angular/common';
import { tileLayer, latLng, Map, marker, icon } from 'leaflet';
import { BehaviorSubject, timer, Subscription } from 'rxjs';

import { SiteManagementService, SiteResponse, AssetResponse, AssetManagementService, PropertyByAssetAndGroupResponse, PropertyResponse, HistoricalDataService, DeviceManagementService } from 'src/app/services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-site-profile-v3',
  templateUrl: './site-profile-v3.component.html',
  styleUrls: ['./site-profile-v3.component.scss']
})
export class SiteProfileV3Component implements OnInit, OnDestroy {
  siteDetail: {
    site: SiteResponse,
    assets: AssetAndPropertiesGroup[]
  } = {
      site: null,
      assets: []
    };
  readonly lastMinuteData = 5;

  // map
  mapOptions = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };
  lastMarkerPoint = new BehaviorSubject({ latitude: 0, longitude: 0 });

  // collaps
  assetsIsCollapsed: boolean[] = [];

  dataTimer: Subscription;

  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private assetManagementService: AssetManagementService,
    private deviceManagementService: DeviceManagementService,
    private historicalDataService: HistoricalDataService
  ) { }

  ngOnInit() {
    const deviceInterval = timer(0, 300000);
    this.dataTimer = deviceInterval.pipe(
      tap(() => this.getSiteDetail())
    ).subscribe();
  }

  ngOnDestroy() {
    this.dataTimer.unsubscribe();
  }

  protected async getSiteDetail() {
    this.siteDetail = {
      site: null,
      assets: []
    };

    // get site
    const siteId = this.route.snapshot.params.siteId,
      site: SiteResponse = await this.siteManagementService.getSiteById(siteId).toPromise();
    this.siteDetail.site = site;
    this.lastMarkerPoint.next({ latitude: site.latitude, longitude: site.longitude });

    // get assets
    const assets: AssetResponse[] = await this.siteManagementService.getAssetBySite(siteId).toPromise();
    for (const iAssets in assets) {
      const asset = assets[iAssets],
        _asset: AssetAndPropertiesGroup = {
          asset: asset,
          propertiesGroup: []
        };
      const groups = await this.assetManagementService.getPropertyGroupByAsset(asset.id).toPromise();
      for (const iGroup in groups) {
        const group = groups[iGroup],
          propertiesGroup = await this.assetManagementService.getPropertyByAssetAndGroup(asset.id, group).toPromise();
        for (const iPropertyGroup in propertiesGroup) {
          const property = propertiesGroup[iPropertyGroup],
            hasDevice = (await this.deviceManagementService.getDeviceConfigurationsBy(property.id).toPromise()).deviceId !== '' ? true : false;
          if (hasDevice) {
            const minDateTime = moment().subtract(1, 'd'),
              maxDateTime = moment(),
              values = await this.historicalDataService.getDataDevicesByAssetPropertyAndTime(property.id, minDateTime, maxDateTime).toPromise();
            if (values.length !== 0) {
              property.value = values[values.length - 1];
            }
          } else {
            property.value = '?';
          }
          propertiesGroup[iPropertyGroup] = property;
        }
        _asset.propertiesGroup.push(propertiesGroup);
      }
      this.siteDetail.assets.push(_asset);
    }
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

  onMapReady(map: Map) {
    const markerMap = marker(latLng(0, 0), {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-normal.png',
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

class AssetAndPropertiesGroup {
  asset: AssetResponse;
  propertiesGroup: PropertyByAssetAndGroupResponse[][];
}