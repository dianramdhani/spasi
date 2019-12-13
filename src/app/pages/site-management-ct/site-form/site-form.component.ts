import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, Map, icon, Marker, marker } from 'leaflet';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { SiteManagementService, AssetManagementService } from 'src/app/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  // map
  mapOptions = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };
  showMap = false;
  lastMarkerPoint = new BehaviorSubject({ latitude: 0, longitude: 0 });

  // form
  siteTypes: string[];
  siteRegions: string[];
  formSite: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private siteManagementService: SiteManagementService,
    private assetManagementService: AssetManagementService
  ) {
    this.formSite = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required),
      region: new FormControl('', Validators.required),
      assets: this.formBuilder.array([this.createAsset()])
    });
  }


  async ngOnInit() {
    [this.siteTypes, this.siteRegions] = await Promise.all([
      this.siteManagementService.getSiteType().toPromise(),
      this.siteManagementService.getRegionAll().toPromise()
    ]);

    // success
    // const res = await this.siteManagementService.getSiteType().toPromise();
    // console.log(res);

    // success
    // const res = await this.siteManagementService.createSite('tesNameUI', 'tesTypeUI', 1, 2, 'tesRegionUI').toPromise();
    // console.log(res);

    // success
    // const res = await this.assetManagementService.createAsset('site-ebad07cc-2f38-4e92-b334-32000fd260c0', 'tesNameUI').toPromise();
    // console.log(res);

    // success
    // const res = await this.assetManagementService.createAssetProperty('asset-488c0270-7d01-466d-aba6-f0327630fb27', 'tesNameUI', 'tesValueTypeUI').toPromise();
    // console.log(res);
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

  checkLocation(latitude: number, longitude: number, e = null) {
    this.showMap = true;
    this.lastMarkerPoint.next({ latitude, longitude });
  }

  // crud asset
  createAsset(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      parameters: this.formBuilder.array([this.createParameter()])
    });
  }

  addAsset() {
    const assets = this.formSite.get('assets') as FormArray;
    assets.push(this.createAsset());
  }

  removeAsset(index: number, e = null) {
    const assets = this.formSite.get('assets') as FormArray;
    assets.removeAt(index);
  }

  // crud parameter
  createParameter(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      valueType: new FormControl('', Validators.required)
    });
  }

  addParameter(formAsset: FormGroup, e = null) {
    const parameters = formAsset.get('parameters') as FormArray;
    parameters.push(this.createParameter());
  }

  removeParameter(formAsset: FormGroup, index: number, e = null) {
    const parameters = formAsset.get('parameters') as FormArray;
    parameters.removeAt(index);
  }

  submit() {
    console.log(this.formSite);
  }
}