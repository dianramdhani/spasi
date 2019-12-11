import { Component, OnInit } from '@angular/core';
import { DetailService } from 'src/app/services/detail.service';
import { Node } from 'angular-tree-search';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss']
})
export class DetailDeviceComponent implements OnInit {
  tree: Node;

  constructor(private detailService: DetailService) { }

  async ngOnInit() {
    this.tree = await this.detailService.getDetail().toPromise();
    console.log(this.tree);
  }
}