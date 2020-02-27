import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import * as Chartist from 'chartist';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { HistoryService } from 'src/app/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-health-history-widget-v3',
  templateUrl: './health-history-widget-v3.component.html',
  styleUrls: ['./health-history-widget-v3.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthHistoryWidgetV3Component implements OnInit, AfterViewInit, OnDestroy {
  @Input('assetPropertyId') assetId: string;
  @ViewChild('chart', { static: true }) chartEl: ElementRef;

  // subscriber
  historySubscription: Subscription;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    const startdate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.historySubscription = this.historyService.getData(this.assetId, startdate, enddate)
      .subscribe(histories => {
        if (histories.length) {
          const modInterpolation = Math.floor(histories.length / 7) + 1,
            data: Chartist.IChartistData = {
              labels: histories.map(history => moment.utc(history.dataTime).format('HH:mm')),
              series: [histories.map(history => +history.subparamValue)]
            },
            options: Chartist.ILineChartOptions = {
              showArea: true,
              showLine: false,
              showPoint: false,
              fullWidth: true,
              axisX: {
                showGrid: true,
                labelInterpolationFnc: (value: string, index: number) => {
                  return index % modInterpolation === 0 ? value : null;
                }
              },
              axisY: {
                labelInterpolationFnc: (value: number, index: number) => {
                  if (value >= 1000000) {
                    return `${value / 1000000}M`;
                  } else {
                    return value;
                  }
                }
              }
            };
          new Chartist.Line(this.chartEl.nativeElement, data, options);
        }
      });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }
}