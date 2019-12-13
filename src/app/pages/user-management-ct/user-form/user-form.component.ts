import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  roles: string[];
  formUser: FormGroup;

  constructor(private userManagementService: UserManagementService, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    // this.roles = await this.userManagementService.getRoles().toPromise();
    // this.formUser = this.formBuilder.group({
    //   email: [null, Validators.required],
    //   username: [null, Validators.required],
    //   role: [['TES0', 'TES1', 'TES2'], Validators.required]
    // });
  }
}