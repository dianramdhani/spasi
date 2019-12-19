import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SiteResponse, TicketingService } from 'src/app/services';

@Component({
  selector: 'app-modal-site-detail',
  templateUrl: './modal-site-detail.component.html',
  styleUrls: ['./modal-site-detail.component.scss']
})
export class ModalSiteDetailComponent implements OnInit {
  @Input() site: SiteResponse;
  incidents: [];

  constructor(
    public activeModal: NgbActiveModal,
    private ticketingService: TicketingService
  ) { }

  async ngOnInit() {
    this.incidents = await this.ticketingService.getIncidentBySiteId(this.site.id).toPromise();
    console.log(this.incidents);
  }
}