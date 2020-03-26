import { Component, NgZone, OnDestroy } from '@angular/core';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { Map, tileLayer, FeatureGroup, marker, latLng, featureGroup, icon, Marker } from 'leaflet';

import { SiteManagementService, SiteResponse } from 'src/app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSiteDetailComponent } from '../../dashboard/modal-site-detail/modal-site-detail.component';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.scss']
})
export class SiteManagementComponent implements OnDestroy {
  sites: SiteResponse[];

  // datatable
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {
    columnDefs: [
      { orderable: false, targets: -1 }
    ]
  };

  // site
  focusSiteSubject = new Subject<SiteResponse>();
  focusSiteSubscriber: Subscription;

  // map
  mapOptions = { layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') };

  constructor(
    private siteManagementService: SiteManagementService,
    private zone: NgZone,
    private modal: NgbModal
  ) { }

  ngOnDestroy() {
    if (this.focusSiteSubscriber instanceof Subscriber) {
      this.focusSiteSubscriber.unsubscribe();
    }
  }

  async refreshSites() {
    this.sites = await this.siteManagementService.getSiteAll().toPromise();
    this.dtTrigger.next();
  }

  async onMapReady(map: Map) {
    await this.refreshSites();

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
      },
      MAJOR: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-warning.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
      MINOR: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-warning.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
      CRITICAL: {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: './assets/img/marker-icon-danger.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
        })
      },
    };

    let lastLayer: FeatureGroup;
    if (lastLayer) {
      lastLayer.removeFrom(map);
    }
    if (this.sites.length !== 0) {
      const markers = this.sites.map(site => {
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

    // marker
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
    this.focusSiteSubscriber = this.focusSiteSubject.subscribe(site => {
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