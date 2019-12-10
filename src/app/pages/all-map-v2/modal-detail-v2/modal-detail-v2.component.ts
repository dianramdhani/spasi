import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detail-v2',
  templateUrl: './modal-detail-v2.component.html',
  styleUrls: ['./modal-detail-v2.component.scss']
})
export class ModalDetailV2Component implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}