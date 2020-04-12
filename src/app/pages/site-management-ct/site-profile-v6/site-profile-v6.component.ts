import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-site-profile-v6',
  templateUrl: './site-profile-v6.component.html',
  styleUrls: ['./site-profile-v6.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteProfileV6Component implements AfterViewInit {
  @ViewChild('svg', { static: true }) svg: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => this.render(), 1000);
  }

  render() {
    const treeData = {
      name: 'AC Power',
      id: '#ac-power',
      children: [
        {
          name: 'Rectifier',
          id: '#rectifier',
          children: [
            {
              name: 'Battery',
              id: '#battery'
            },
            {
              name: 'DC Load',
              id: '#dc-load'
            },
          ]
        }
      ]
    };

    let margin = { top: 0, right: 90, bottom: 100, left: 90 },
      width = 1200 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    let treemap = d3.tree()
      .size([height, width])
      .separation((a, b) => a.parent == b.parent ? 2 : 1);

    let nodes: any = treemap(d3.hierarchy(treeData, (d: any) => {
      return d.children;
    }));

    let svg = d3.select(this.svg.nativeElement)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom),
      g = svg.append('g')
        .attr('transform',
          `translate(${margin.left},${margin.top})`);

    let link = g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.y},${d.parent.x}`;
      });

    let node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', (d: any) => {
        return 'node' +
          (d.children ? ' node--internal' : ' node--leaf');
      })
      .attr('transform', (d: any) => {
        if ('id' in d.data) {
          const table = d3.select(d.data.id)
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
