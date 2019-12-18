import { Component, OnInit } from '@angular/core';
import { TicketingService } from 'src/app/services/ticketing.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.scss']
})
export class ListAlertComponent implements OnInit {
  alerts: [];
  constructor(
    private ticketingService: TicketingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.alerts = await this.ticketingService.getIncident().toPromise();
  }

  showDetail(alert: {}, e = null) {
    this.router.navigate(['alert-detail'], { relativeTo: this.route, queryParams: { alert: JSON.stringify(alert) } })
  }
}