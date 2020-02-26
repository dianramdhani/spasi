import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { HistoryService } from 'src/app/services';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-health-history-widget',
  templateUrl: './health-history-widget.component.html',
  styleUrls: ['./health-history-widget.component.scss']
})
export class HealthHistoryWidgetComponent implements OnInit, OnDestroy {
  @Input('assetPropertyId') assetId: string;
  periods = [
    {
      label: '1 Hour',
      value: {
        startdate: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '6 Hour',
      value: {
        startdate: moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '1 Day',
      value: {
        startdate: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '1 Week',
      value: {
        startdate: moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '1 Month',
      value: {
        startdate: moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '6 Week',
      value: {
        startdate: moment().subtract(6, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
        enddate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ];
  periodsSelected = this.periods[2];

  // chart
  @ViewChild('chart', { static: true }) chartEl: ElementRef;
  chart: Chart;

  // subscriber
  historySubscription: Subscription;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line', options: {
        responsive: false,
        title: {
          display: true,
          text: 'Last 1 Day'
        }
      }
    });
    this.drawChart();
  }

  ngOnDestroy() {
    console.log('remove widget');
  }

  drawChart() {
    this.historySubscription = this.historyService.getData(this.assetId, this.periodsSelected.value.startdate, this.periodsSelected.value.enddate)
      .subscribe(histories => {
        if (histories.length) {
          function removeData(chart: Chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
              dataset.data.pop();
            });
            chart.update();
          }

          const data: Chart.ChartData = {
            labels: histories.map(history => moment.utc(history.dataTime).format('HH:mm')),
            datasets: [
              {
                label: histories[0].subparamName,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                data: histories.map(history => +history.subparamValue),
                fill: false
              }
            ]
          };
          removeData(this.chart);
          this.chart.data = data;
          this.chart.update();
        }
      });
  }
}