import { Component, OnInit, NgZone } from '@angular/core';
import { tileLayer, Map, icon, FeatureGroup, marker, latLng, featureGroup, Marker } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SiteManagementService, SiteResponse } from 'src/app/services';

import { ModalSiteDetailComponent } from './modal-site-detail/modal-site-detail.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // site processing
  selectedRegion: string = 'ALL';
  selectedStatus: string = 'ALL';
  regions: string[] = [];
  sites: SiteResponse[] = [];
  filteredSites: SiteResponse[] = [];
  siteStatistics = {
    all: 0,
    danger: 0,
    warning: 0,
    normal: 0,
    no_comm: 0
  };

  // map
  mapOptions = { layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') };
  sitesSubject = new BehaviorSubject<SiteResponse[]>([]);
  focusSiteSubject = new Subject<SiteResponse>();

  constructor(
    private siteManagementService: SiteManagementService,
    private zone: NgZone,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.siteManagementService.getRegionAll()
      .subscribe(regions => this.regions = regions);
    const updateDataInterval = timer(0, 60000);
    updateDataInterval.pipe(tap(() => this.onRegionChange(this.selectedRegion))).toPromise();
  }

  async onRegionChange(selectedRegion, e = null) {
    if (selectedRegion === 'ALL') {
      this.sites = await this.siteManagementService.getSiteAll().toPromise();
    } else {
      this.sites = await this.siteManagementService.getSiteByRegion(selectedRegion).toPromise();
    }
    this.selectedStatus = 'ALL';
    this.filteredSites = this.sites;

    // update siteStatistics
    this.siteStatistics = {
      all: this.filteredSites.length,
      danger: this.filteredSites.filter(site => site.status === 'DANGER').length,
      warning: this.filteredSites.filter(site => site.status === 'WARNING').length,
      normal: this.filteredSites.filter(site => site.status === 'NORMAL').length,
      no_comm: this.filteredSites.filter(site => site.status === 'NO_COMM').length
    }

    // set to map
    this.sitesSubject.next(this.filteredSites);
  }

  onStatusChange(status: string, e = null) {
    this.selectedStatus = status;
    this.filteredSites = this.sites.filter(site => site.status === status);

    // set to map
    this.sitesSubject.next(this.filteredSites);
  }

  focusTo(site: SiteResponse, e = null) {
    this.focusSiteSubject.next(site);
  }

  toPercent(x: number, all: number) {
    const percent = x / all * 100 || 0;
    return percent.toFixed(2);
  }

  onMapReady(map: Map) {
    const markerIcon = {
      DANGER: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-danger.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
      WARNING: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-warning.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
      NORMAL: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-normal.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
      NO_COMM: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-no_comm.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      }
    };
    let lastLayer: FeatureGroup;
    this.sitesSubject.subscribe(sites => {
      if (lastLayer) {
        lastLayer.removeFrom(map);
      }

      if (sites.length !== 0) {
        const markers = sites.map(site => {
          const _marker = marker(latLng(site.latitude, site.longitude), markerIcon[site.status]);
          _marker.addEventListener('click', () => this.zone.run(() => {
            this.focusSiteSubject.next(site);
            this.openModalSiteDetail(site);
          }));
          return _marker;
        });
        lastLayer = featureGroup(markers);
        lastLayer.addTo(map);
        map.fitBounds(lastLayer.getBounds());
      }
    });

    const focusIcon = {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: './assets/img/marker-icon-focus.png',
      }),
      opacity: 0.6
    };
    let lastFocusMarker: Marker;
    this.focusSiteSubject.subscribe(site => {
      if (lastFocusMarker) {
        lastFocusMarker.removeFrom(map);
      }
      const _latLng = latLng(site.latitude, site.longitude);
      map.panTo(_latLng);
      lastFocusMarker = marker(_latLng, focusIcon);
      lastFocusMarker.addEventListener('click', () => this.zone.run(() => this.openModalSiteDetail(site)));
      lastFocusMarker.addTo(map);
    });
  }

  openModalSiteDetail(site: SiteResponse, e = null) {
    const modalRef = this.modal.open(ModalSiteDetailComponent);
    modalRef.componentInstance.site = site;
  }
}
