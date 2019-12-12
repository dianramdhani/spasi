import { Component, OnInit } from '@angular/core';

import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  roles: string[];

  constructor(private userManagementService: UserManagementService) { }

  async ngOnInit() {
    this.roles = await this.userManagementService.getRoles().toPromise();
  }
}