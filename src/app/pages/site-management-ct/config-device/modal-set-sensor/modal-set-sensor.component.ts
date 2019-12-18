import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceManagementService, DeviceResponse, SensorResponse, SensorPropertiesResponse, AssetManagementService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-set-sensor',
  templateUrl: './modal-set-sensor.component.html',
  styleUrls: ['./modal-set-sensor.component.scss']
})
export class ModalSetSensorComponent implements OnInit {
  @Input() assetPropertyId: string;
  @Output() success = new EventEmitter();
  devices: DeviceResponse[];
  sensors: SensorResponse[];
  sensorProperties: SensorPropertiesResponse[];
  formSetSensor: FormGroup;
  showLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private deviceManagementService: DeviceManagementService,
    private assetManagementService: AssetManagementService
  ) {
    this.formSetSensor = new FormGroup({
      deviceId: new FormControl('', Validators.required),
      sensorId: new FormControl('', Validators.required),
      sensorPropertyId: new FormControl('', Validators.required)
    });
  }

  async ngOnInit() {
    this.devices = await this.deviceManagementService.getDeviceAll().toPromise();
    this.formSetSensor.controls.deviceId.valueChanges
      .subscribe(async deviceId => {
        if (deviceId) {
          this.sensors = await this.deviceManagementService.getSensorByDeviceId(deviceId).toPromise();
          this.formSetSensor.controls.sensorId.patchValue('');
        }
      });
    this.formSetSensor.controls.sensorId.valueChanges
      .subscribe(async sensorId => {
        if (sensorId) {
          this.sensorProperties = await this.deviceManagementService.getSensorPropertBySensorId(sensorId).toPromise();
          this.formSetSensor.controls.sensorPropertyId.patchValue('');
        }
      });
  }

  async submit() {
    if (this.formSetSensor.valid) {
      this.showLoading = true;
      const { sensorPropertyId } = this.formSetSensor.value;
      await this.assetManagementService.createAssetPropertyMapping(this.assetPropertyId, sensorPropertyId).toPromise();
      this.showLoading = false;
      this.success.emit();
      this.activeModal.dismiss();
    }
  }
}