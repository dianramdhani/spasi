import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { SiteManagementService, SiteResponse } from 'src/app/services';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.scss']
})
export class SiteManagementComponent implements OnInit {
  sites: SiteResponse[];

  // datatable
  dtTrigger = new Subject();
  dtOptions: DataTables.Settings = {
    columnDefs: [
      { orderable: false, targets: -1 }
    ]
  };

  constructor(private siteManagementService: SiteManagementService) { }

  ngOnInit() {
    this.refreshSites();
  }

  async refreshSites() {
    this.sites = await this.siteManagementService.getSiteAll().toPromise();
    this.dtTrigger.next();
  }
}