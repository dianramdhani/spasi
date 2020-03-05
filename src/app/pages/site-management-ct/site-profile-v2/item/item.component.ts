import { Component, OnInit, Input } from '@angular/core';

import { SiteDashboard } from 'src/app/services/site-dashboard.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input('item') item: SiteDashboard;
  @Input('src') src: string;

  constructor() { }

  ngOnInit() {
  }
}