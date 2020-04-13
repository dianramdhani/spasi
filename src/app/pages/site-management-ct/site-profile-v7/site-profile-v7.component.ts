import { Component, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from 'd3';
import { flextree } from 'd3-flextree';

import { SiteDashboardService, SiteDashboard } from 'src/app/services/site-dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-site-profile-v7',
  templateUrl: './site-profile-v7.component.html',
  styleUrls: ['./site-profile-v7.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteProfileV7Component implements AfterViewInit {
  @ViewChild('svg', { static: true }) svg: ElementRef;
  siteId: string;
  topMargin: number;
  readonly heightCard = 250;
  readonly widthCard = 400;
  loading = true;

  // data
  acPln: SiteDashboard[] = [];
  rectifierSummary: SiteDashboard[] = [];
  batterySummary: SiteDashboard[] = [];
  rectifierDetails: SiteDashboard[] = [];
  batteryDetails: SiteDashboard[] = [];

  constructor(
    private route: ActivatedRoute,
    private siteDashboardService: SiteDashboardService
  ) { }

  ngAfterViewInit() {
    this.siteId = this.route.snapshot.params.siteId;

    forkJoin(
      this.siteDashboardService.getSiteById(this.siteId, 'AC PLN'),
      this.siteDashboardService.getSiteById(this.siteId, 'Rectifier Summary'),
      this.siteDashboardService.getSiteById(this.siteId, 'Rectifier Detail'),
      this.siteDashboardService.getSiteById(this.siteId, 'Battery Summary'),
      this.siteDashboardService.getSiteById(this.siteId, 'Battery Detail')
    ).subscribe(([acPln, rectifierSummary, rectifierDetails, batterySummary, batteryDetails]) => {
      this.acPln = acPln;
      this.rectifierSummary = rectifierSummary;
      this.batterySummary = batterySummary;
      this.rectifierDetails = rectifierDetails
      this.batteryDetails = batteryDetails;

      const treeData = {
        name: 'AC PLN',
        id: '#ac-pln',
        size: [this.heightCard, this.widthCard],
        children: [
          {
            name: 'Rectifier',
            id: '#rectifier',
            size: [this.heightCard, this.widthCard],
            children: [
              ...rectifierDetails.map((rectifierDetail, index) => {
                return {
                  name: rectifierDetail.groupName,
                  id: `#rectifier-detail-${index}`,
                  size: [this.heightCard, this.widthCard - 150],
                };
              }),
              {
                name: 'Battery',
                id: '#battery',
                size: [this.heightCard * batteryDetails.length + 50, this.widthCard - 150],
                children: batteryDetails.map((batteryDetail, index) => {
                  return {
                    name: batteryDetail.groupName,
                    id: `#battery-detail-${index}`,
                    size: [this.heightCard, this.widthCard - 150],
                  }
                })
              }
            ]
          }
        ]
      };

      this.topMargin = this.heightCard * (batteryDetails.length / 2 + rectifierDetails.length / 2) - (this.heightCard / 2 - 70);
      const svgHeight = this.heightCard * (batteryDetails.length + rectifierDetails.length) + 50
      setTimeout(() => this.render(treeData, svgHeight), 100);

      this.loading = false;
    });
  }

  render(treeData: any, svgHeight: number) {
    const margin = { top: this.topMargin, right: 90, bottom: 100, left: this.widthCard / 2 },
      width = 1600 - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;

    const layout = flextree();
    const nodes = layout(layout.hierarchy(treeData));

    const
      svg = d3.select(this.svg.nativeElement)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const link = g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.y},${d.parent.x}`;
      });

    const node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', (d: any) => {
        return 'node' +
          (d.children ? ' node--internal' : ' node--leaf');
      })
      .attr('transform', (d: any) => {
        if ('id' in d.data) {
          d3.select(d.data.id)
            .style('top', `${d.x}px`)
            .style('left', `${d.y}px`)
            .classed('hidden', false);
        }

        return `translate(${d.y},${d.x})`;
      });

    node.append('circle')
      .attr('r', 10);

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => { return d.children ? -13 : 13; })
      .style('text-anchor', (d: any) => {
        return d.children ? 'end' : 'start';
      })
      .text((d: any) => { return d.data.name; })
  }
}