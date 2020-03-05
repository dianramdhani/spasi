import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer, Subscription } from 'rxjs';

import { SiteDashboardService, SiteDashboard } from 'src/app/services/site-dashboard.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-site-profile-v2',
  templateUrl: './site-profile-v2.component.html',
  styleUrls: ['./site-profile-v2.component.scss']
})
export class SiteProfileV2Component implements OnInit, OnDestroy {
  rectifierDetail: SiteDashboard[] = [];
  rectifierSummary: SiteDashboard[] = [];
  batteryDetail: SiteDashboard[] = [];
  batterySummary: SiteDashboard[] = [];
  acPln: SiteDashboard[] = [];

  siteId: string;
  loading = true;
  dataTimer: Subscription;

  constructor(
    private route: ActivatedRoute,
    private siteDashboardService: SiteDashboardService
  ) { }

  ngOnInit() {
    const siteId = this.route.snapshot.params.siteId;
    this.siteId = siteId;
    const deviceInterval = timer(0, 120000);
    this.dataTimer = deviceInterval.pipe(
      tap(() => {
        Promise.all([
          this.siteDashboardService.getSiteById(siteId, 'Rectifier Detail').toPromise(),
          this.siteDashboardService.getSiteById(siteId, 'Rectifier Summary').toPromise(),
          this.siteDashboardService.getSiteById(siteId, 'Battery Detail').toPromise(),
          this.siteDashboardService.getSiteById(siteId, 'Battery Summary').toPromise(),
          this.siteDashboardService.getSiteById(siteId, 'AC PLN').toPromise(),
        ]).then(res => {
          this.rectifierDetail = res[0];
          this.rectifierSummary = res[1];
          this.batteryDetail = res[2];
          this.batterySummary = res[3];
          this.acPln = res[4];
          this.loading = false;
          console.log(this.acPln, res);
        });
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.dataTimer.unsubscribe();
  }
}