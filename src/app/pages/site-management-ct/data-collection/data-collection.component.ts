import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.scss']
})
export class DataCollectionComponent implements OnInit {
  collections: Collection[] = [
    { value: 'mysql', title: 'Database MySQL' },
    { value: 'oracle', title: 'Database Oracle' },
    { value: 'postgresql', title: 'Database PostgreSQL' },
    { value: 'mongodb', title: 'Database MongoDB' },
    { value: 'access', title: 'Database Ms Access' },
    { value: 'rest', title: 'Webservice - REST' },
    { value: 'soap', title: 'Webservice - SOAP' },
    { value: 'localfile', title: 'LocalFile' },
    { value: 'sftp', title: 'SFTP' },
    { value: 'webcrawl', title: 'WebCrawl' },
  ];
  collectionSelected: Collection;

  constructor() { }

  ngOnInit() {
    this.collectionSelected = this.collections[0];
  }

}

class Collection {
  value: string;
  title: string;
}
