import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
import { SiteManagementService, AssetManagementService } from 'src/app/services';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  options = {
    layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  constructor(private siteManagementService: SiteManagementService, private assetManagementService: AssetManagementService) { }

  async ngOnInit() {
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
}