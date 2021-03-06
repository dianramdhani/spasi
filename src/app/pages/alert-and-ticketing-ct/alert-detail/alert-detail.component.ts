import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketingService } from 'src/app/services/ticketing.service';

@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.scss']
})
export class AlertDetailComponent implements OnInit {
  alert: any;
  formResolve: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketingService: TicketingService,
    private router: Router
  ) {
    this.formResolve = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.alert = JSON.parse(this.route.snapshot.queryParams.alert);
  }

  async resolve() {
    if (this.formResolve.valid) {
      const { message } = this.formResolve.value;
      await this.ticketingService.putIncident(this.alert.incident_id, message).toPromise();
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}