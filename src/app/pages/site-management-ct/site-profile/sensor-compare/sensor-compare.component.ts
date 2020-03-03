import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as Chart from 'chart.js';

import { SiteManagementService, AssetManagementService, DeviceManagementService, HistoricalDataService, AssetResponse, HistoryService, History } from 'src/app/services';

@Component({
  selector: 'app-sensor-compare',
  templateUrl: './sensor-compare.component.html',
  styleUrls: ['./sensor-compare.component.scss']
})
export class SensorCompareComponent implements OnInit {
  assets: any[] = [];
  histories: History[][] = [];
  formGraphs = new FormArray([]);

  // periods
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
  readonly timeFormat = 'YYYY-MM-DD HH:mm:ss';

  constructor(
    private route: ActivatedRoute,
    private siteManagementService: SiteManagementService,
    private assetManagementService: AssetManagementService,
    private historyService: HistoryService,
  ) { }

  async ngOnInit() {
    this.chart = new Chart(this.chartEl.nativeElement, {
      type: 'line',
      options: {
        responsive: false,
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            type: 'time',
          }],
        },
      }
    });

    // get assets
    const siteId = this.route.snapshot.params.siteId,
      assets = await this.siteManagementService.getAssetBySite(siteId).toPromise();
    for (const i in assets) {
      const asset = assets[i],
        properties = await this.assetManagementService.getPropertyByAsset(asset.id).toPromise();
      assets[i] = Object.assign(asset, { properties });
    }
    this.assets = assets;

    // add 1 form
    this.addGraph();
  }

  addGraph() {
    const formGraphs = new FormGroup({
      assetIndex: new FormControl(null, Validators.required),
      propertyIndex: new FormControl(null, Validators.required)
    });
    this.formGraphs.push(formGraphs);
  }

  removeGraph(index: number, event: Event) {
    this.formGraphs.removeAt(index);
  }

  async showGraph() {
    // get all histories
    this.histories = [];
    const values = this.formGraphs.value;
    for (const i in values) {
      const assetSelected = this.assets[values[i].assetIndex],
        propertySelected = assetSelected.properties[values[i].propertyIndex],
        history = await this.historyService.getData(propertySelected.id, this.periodsSelected.value.startdate, this.periodsSelected.value.enddate).toPromise();
      this.histories.push(history);
    }

    // plot graph
    const datasets = this.histories.map((histories, i) => {
      const assetSelected = this.assets[values[i].assetIndex],
        propertySelected = assetSelected.properties[values[i].propertyIndex];
      return {
        label: `${assetSelected.name} ${propertySelected.name}`,
        data: histories.map(history => {
          return {
            t: moment.utc(history.dataTime).toDate(),
            y: history.subparamValue
          };
        })
      };
    });
    this.chart.clear();
    this.chart.data = { datasets };
    this.chart.update();
  }
}