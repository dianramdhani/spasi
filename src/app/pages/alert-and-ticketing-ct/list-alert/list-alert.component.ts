import { Component, OnInit } from '@angular/core';
import { TicketingService } from 'src/app/services/ticketing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.scss']
})
export class ListAlertComponent implements OnInit {
  alerts: [];

  // datatable
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {
    columnDefs: [
      { orderable: false, targets: -1 }
    ]
  };

  constructor(
    private ticketingService: TicketingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.alerts = await this.ticketingService.getIncident().toPromise();
    this.dtTrigger.next();
  }

  showDetail(alert: {}, e = null) {
    this.router.navigate(['alert-detail'], { relativeTo: this.route, queryParams: { alert: JSON.stringify(alert) } })
  }
}