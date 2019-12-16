import { Component, OnInit } from '@angular/core';
import { UserManagementService, UserResponse } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users: UserResponse[];

  constructor(private userManagementService: UserManagementService) { }

  async ngOnInit() {
    this.users = await this.userManagementService.getUser().toPromise();
    // console.log(this.users);
  }
}