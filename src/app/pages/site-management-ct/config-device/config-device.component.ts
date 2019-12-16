import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AssetManagementService, SiteManagementService, AssetResponse } from 'src/app/services';

import { ModalSetSensorComponent } from './modal-set-sensor/modal-set-sensor.component';

@Component({
  selector: 'app-config-device',
  templateUrl: './config-device.component.html',
  styleUrls: ['./config-device.component.scss']
})
export class ConfigDeviceComponent implements OnInit {
  assets: AssetResponse[];

  constructor(
    private modal: NgbModal,
    private assetManagementService: AssetManagementService,
    private siteManagementService: SiteManagementService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.refreshAssets();
  }

  async refreshAssets() {
    const siteId = this.route.snapshot.params.siteId;
    this.assets = await this.siteManagementService.getAssetBySite(siteId).toPromise();
    for (const i in this.assets) {
      const asset = this.assets[i],
        properties = await this.assetManagementService.getPropertyByAsset(asset.id).toPromise();
      this.assets[i] = Object.assign(asset, { properties });
    }
    console.log(this.assets);
  }

  openModalSetSensor() {
    console.log('tes set sensor');
    this.modal.open(ModalSetSensorComponent);
  }
}