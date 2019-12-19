import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AssetManagementService, SiteManagementService, AssetResponse, DeviceManagementService } from 'src/app/services';

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
    private route: ActivatedRoute,
    private deviceManagementService: DeviceManagementService
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
      for (const j in properties) {
        const property = properties[j],
          device = await this.deviceManagementService.getDeviceConfigurationsBy(property.id).toPromise();
        properties[j] = Object.assign(property, { device });
        console.log({ device });
      }
      this.assets[i] = Object.assign(asset, { properties });
    }
  }

  openModalSetSensor(assetPropertyId: string, e = null) {
    const modalRef = this.modal.open(ModalSetSensorComponent);
    modalRef.componentInstance.assetPropertyId = assetPropertyId;
    modalRef.componentInstance.success.subscribe(() => {
      this.refreshAssets();
    });
  }
}