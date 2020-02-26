import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import * as moment from 'moment';

import { HistoryService } from 'src/app/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-health-history-widget-v2',
  templateUrl: './health-history-widget-v2.component.html',
  styleUrls: ['./health-history-widget-v2.component.scss']
})
export class HealthHistoryWidgetV2Component implements OnInit, OnDestroy {
  @Input('assetPropertyId') assetId: string;
  historySubscription: Subscription;
  @ViewChild('chart', { static: true }) chartEl: ElementRef;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    const startdate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.historySubscription = this.historyService.getData(this.assetId, startdate, enddate).subscribe(histories => {
      const data = histories.map(history => +history.subparamValue);
      ($(this.chartEl.nativeElement) as any)
        .sparkline(data, {
          type: 'line',
          width: '100%',
          height: '100px'
        });
    });
  }

  ngOnDestroy() { }
}