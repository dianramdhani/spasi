import { Component, AfterViewInit, ViewEncapsulation, Input, OnDestroy, OnInit } from '@angular/core';
import { replace } from 'feather-icons';
import { Router } from '@angular/router';

import { Menu, Type } from './menu.model';

import { LoginService } from 'src/app/services';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WrapperComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() menus: Menu[];
  type = Type;
  scriptElements = [
    document.createElement('script'),
    document.createElement('script')
  ];
  user = { name: '', role: '' };

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userManagementService: UserManagementService
  ) { }

  async ngOnInit() {
    const { username } = this.loginService.getUser(),
      { role } = await this.userManagementService.getUserByUsername(username).toPromise();
    this.user = { name: username, role };
  }

  ngAfterViewInit() {
    this.scriptElements[0].src = './dashforge.js';
    this.scriptElements[1].src = './dashforge.aside.js';
    this.scriptElements.forEach(scriptElement => {
      document.body.appendChild(scriptElement);
    });
    replace();
  }

  ngOnDestroy() {
    this.scriptElements.forEach(scriptElement => {
      scriptElement.parentElement.removeChild(scriptElement);
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}