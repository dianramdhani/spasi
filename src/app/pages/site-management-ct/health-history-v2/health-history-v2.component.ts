import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as moment from 'moment';
import { HistoryService } from 'src/app/services';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-history-v2',
  templateUrl: './health-history-v2.component.html',
  styleUrls: ['./health-history-v2.component.scss']
})
export class HealthHistoryV2Component implements OnInit {
  assetId: string;
  sensorName: string;
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

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.assetId = this.route.snapshot.params.assetPropertyId;
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line', options: {
        responsive: false,
        title: { display: true }
      }
    });
    this.drawChart();
  }

  drawChart() {
    this.historyService.getData(this.assetId, this.periodsSelected.value.startdate, this.periodsSelected.value.enddate)
      .subscribe(histories => {
        if (histories.length) {
          const data: Chart.ChartData = {
            labels: histories.map(history => moment.utc(history.dataTime).format('YYYY-MM-DD HH:mm')),
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
          this.chart.data = data;
          this.chart.options.title.text = `Last ${this.periodsSelected.label}`;
          this.chart.update();
          this.sensorName = histories[0].sensorName;
        }
      });
  }
}