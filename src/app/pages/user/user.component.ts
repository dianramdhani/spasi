import { Component, OnInit } from '@angular/core';

import { Menu, Type } from 'src/app/core/wrapper/menu.model';

@Component({
  selector: 'app-user',
  template: '<app-wrapper [menus]="menus"></app-wrapper>',
  styles: []
})
export class UserComponent {
  menus: Menu[];

  constructor() {
    this.menus = [
      {
        type: Type.LINK,
        label: 'Dashboard',
        icon: 'monitor',
        state: { to: '/user/dashboard', params: {} }
      },
      {
        type: Type.LINK,
        label: 'Site Management',
        icon: 'check-square',
        state: { to: '/user/site-management', params: {} }
      },
      {
        type: Type.LINK,
        label: 'Alert and Ticketing',
        icon: 'alert-octagon',
        state: { to: '/user/alert-and-ticketing', params: {} }
      },
      {
        type: Type.LINK,
        label: 'Sensor Explorer',
        icon: 'disc',
        state: { to: '/user/sensor-explorer', params: {} }
      },
      {
        type: Type.LINK,
        label: 'User Management',
        icon: 'users',
        state: { to: '/user/user-management', params: {} }
      },
      {
        type: Type.HASSUBMENUS,
        label: 'Reporting',
        icon: 'file-text',
        subMenus: [
          {
            label: 'Komparasi PLN vs Battery Load',
            state: { to: '/user/reporting/pln-vs-bl', params: {} }
          },
          {
            label: 'Komparasi PLN vs Rectifier Load',
            state: { to: '/user/reporting/pln-vs-rl', params: {} }
          }
        ]
      },
    ];
  }
}