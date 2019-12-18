import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-health-history',
  templateUrl: './health-history.component.html',
  styleUrls: ['./health-history.component.scss']
})
export class HealthHistoryComponent implements OnInit {
  period: number = 1;
  assetId: string;
  what: any;

  chartType = 'line';
  chartLegends = true;
  chartPlugins = [pluginAnnotations];
  chartData = [{ data: [], label: 'value', pointRadius: 0, pointHoverRadius: 3, pointHitRadius: 5 }];
  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'hour'
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    }
  };

  constructor(private service: HistoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.assetId = this.route.snapshot.params.assetPropertyId;
    this.getData();
  }

  change() {
    this.getData();
  }

  async getData() {
    this.chartData[0].data = [];
    let startdate;
    let enddate;

    if (this.period == 1) {
      startdate = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (this.period == 2) {
      startdate = moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (this.period == 3) {
      startdate = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (this.period == 4) {
      startdate = moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (this.period == 5) {
      startdate = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    } else if (this.period == 6) {
      startdate = moment().subtract(6, 'weeks').format('YYYY-MM-DD HH:mm:ss');
      enddate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    let tmp = await this.service.getData(this.assetId, startdate, enddate).toPromise();
    let lasttime = '';
    let total = 0;
    let count = 0;
    for (let i = 0; i < tmp.length; i++) {
      let t = tmp[i];
      let timestring = t.dataTime.substring(0, 16);

      if (i == 0) {
        total += +t.subparamValue;
        count++;
      } else if (lasttime != timestring || i == tmp.length - 1) {
        if (i == tmp.length - 1) {
          total += +t.subparamValue;
          count++;
        }

        let mean = total / count;
        let time = lasttime.replace('T', ' ') + ':00';

        this.chartData[0].data.push({ x: time, y: mean, label: '' });

        total = 0;
        count = 0;
      } else {
        total += +t.subparamValue;
        count++;
      }

      lasttime = timestring;
    }
  }
}