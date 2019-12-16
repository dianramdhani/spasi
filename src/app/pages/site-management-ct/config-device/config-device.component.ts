import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalSetSensorComponent } from './modal-set-sensor/modal-set-sensor.component';

@Component({
  selector: 'app-config-device',
  templateUrl: './config-device.component.html',
  styleUrls: ['./config-device.component.scss']
})
export class ConfigDeviceComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  ngOnInit() {
  }

  openModalSetSensor() {
    console.log('tes set sensor');
    this.modal.open(ModalSetSensorComponent);
  }
}