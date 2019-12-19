import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { SiteResponse, TicketingService } from 'src/app/services';

@Component({
  selector: 'app-modal-site-detail',
  templateUrl: './modal-site-detail.component.html',
  styleUrls: ['./modal-site-detail.component.scss']
})
export class ModalSiteDetailComponent implements OnInit {
  @Input() site: SiteResponse;
  alerts: [];

  constructor(
    public activeModal: NgbActiveModal,
    private ticketingService: TicketingService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.alerts = await this.ticketingService.getIncidentBySiteId(this.site.id).toPromise();
  }

  detail(alert: {}, e = null) {
    this.router.navigate(['/user/alert-and-ticketing/alert-detail'], { queryParams: { alert: JSON.stringify(alert) } });
    this.activeModal.dismiss();
  }
}