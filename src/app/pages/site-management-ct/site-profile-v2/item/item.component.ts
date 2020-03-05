import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'

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

  last5Minute(time: string) {
    const timeData = moment(moment(time).format('YYYY-MM-DD HH:mm')),
      timeCompare = moment().subtract(5, 'minute');
    console.log(timeData.toDate(), timeCompare.toDate());
    return !timeCompare.isBefore(timeData);
  }
}