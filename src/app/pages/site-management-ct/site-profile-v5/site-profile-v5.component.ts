import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-site-profile-v5',
  templateUrl: './site-profile-v5.component.html',
  styleUrls: ['./site-profile-v5.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteProfileV5Component implements AfterViewInit {
  @ViewChild('svg', { static: false }) svg: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => this.render(), 1000);
  }

  private render() {
    let treeData = {
      name: 'Top Level',
      children: [
        {
          name: 'Level 2: A',
          children: [
            { name: 'Son of A' },
            { name: 'Son of A', id: 'tooltip1' },
            { name: 'Daughter of A', id: 'tooltip2' }
          ]
        }
      ]
    };

    const margin = { top: 40, right: 30, bottom: 50, left: 30 },
      width = 660 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const treemap = d3.tree()
      .size([width, height]);

    const nodes = treemap(d3.hierarchy(treeData));

    const
      svg = d3.select(this.svg.nativeElement)
        .style('position', 'absolute')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom),
      g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const link = g.selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', function (d: any) {
        return `
            M${d.x},${d.y}
            C${d.x},${(d.y + d.parent.y) / 2}
            ${d.parent.x},${(d.y + d.parent.y) / 2}
            ${d.parent.x},${d.parent.y}
        `;
      });

    const node = g.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', function (d: any) {
        return `node ${d.children ? 'node--internal' : 'node--leaf'}`;
      })
      .attr('transform', function (d: any) {
        if ('id' in d.data) {
          d3.select(`#${d.data.id}`)
            .style("left", d.x + "px")
            .style("top", d.y + "px")
            .classed("hidden", false);
        }
        return `translate(${d.x}, ${d.y})`;
      });

    node.append('circle')
      .attr('r', 10);

    node.append('text')
      .attr('dy', '.35em')
      .attr('y', function (d: any) { return d.children ? -20 : 20; })
      .style('text-anchor', 'middle')
      .text(function (d: any) { return d.data.name; });
  }

}
