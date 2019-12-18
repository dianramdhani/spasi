import { Component, OnInit } from '@angular/core';
import { TicketingService } from 'src/app/services/ticketing.service';

@Component({
  selector: 'app-list-alert',
  templateUrl: './list-alert.component.html',
  styleUrls: ['./list-alert.component.scss']
})
export class ListAlertComponent implements OnInit {
  alerts: [];
  constructor(private ticketingService: TicketingService) { }

  async ngOnInit() {
    this.alerts = await this.ticketingService.getIncident().toPromise();
  }
}