import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SiteResponse } from 'src/app/services';

@Component({
  selector: 'app-modal-site-detail',
  templateUrl: './modal-site-detail.component.html',
  styleUrls: ['./modal-site-detail.component.scss']
})
export class ModalSiteDetailComponent {
  @Input() site: SiteResponse;

  constructor(public activeModal: NgbActiveModal) { }
}