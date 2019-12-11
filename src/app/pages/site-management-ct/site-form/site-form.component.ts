import { Component, OnInit } from '@angular/core';
import { tileLayer } from 'leaflet';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  options = { layers: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') };

  constructor() { }

  ngOnInit() {
  }
}