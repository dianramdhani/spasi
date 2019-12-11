import { Injectable } from '@angular/core';
import { Node } from 'angular-tree-search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(private httpClient: HttpClient) { }

  getDetail() {
    return this.httpClient.get<Node>('./assets/test/detail.test.json');
  }
}