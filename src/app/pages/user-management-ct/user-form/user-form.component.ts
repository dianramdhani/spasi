import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { UserManagementService } from 'src/app/services/user-management.service';
import { SiteManagementService, SiteResponse } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  statusEdit = false;
  roles: string[];
  regions: string[];
  sites: SiteResponse[];
  formUser: FormGroup;

  constructor(
    private userManagementService: UserManagementService,
    private siteManagementService: SiteManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      role: new FormControl('', Validators.required),
      region: new FormControl(''),
      site: new FormControl('')
    });

    this.roles = await this.userManagementService.getRoles().toPromise();
    this.onRoleChange();

    this.checkEdit();
  }

  async checkEdit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.statusEdit = true;
      const user = await this.userManagementService.getUserByUsername(username).toPromise();
      this.formUser.patchValue(user);
      if (user.role === 'SITE') {
        const site = await this.siteManagementService.getSiteByUser(username).toPromise();
        console.log(site);
      }
    }
  }

  onRoleChange() {
    this.formUser.get('role').valueChanges.subscribe(async role => {
      if (
        role === 'REGION' ||
        role === 'SITE'
      ) {
        const region = this.formUser.controls['region'];
        region.setValue('');
        region.setValidators(Validators.required);
        this.regions = await this.siteManagementService.getRegionAll().toPromise();
      }

      if (role === 'SITE') {
        this.onRegionChange();
      }
    });
  }

  onRegionChange() {
    this.formUser.get('region').valueChanges.subscribe(async (region: string) => {
      if (region) {
        const site = this.formUser.controls['site'];
        site.setValue('', Validators.required);
        site.setValidators(Validators.required);
        this.sites = await this.siteManagementService.getSiteByRegion(region).toPromise();
      }
    });
  }

  async add() {
    const { username, email, role, region, site } = this.formUser.value;
    await this.userManagementService.createUser(username, email, role).toPromise();
    switch (role) {
      case 'REGION':
        await this.userManagementService.createUserRegion(username, region).toPromise();
        break;
      case 'SITE':
        await this.userManagementService.createUserSite(username, site).toPromise();
        break;
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  async delete() {
    if (confirm('Are you sure to remove this user?')) {
      const { role, username } = this.formUser.value;
      switch (role) {
        case 'REGION':
          await this.userManagementService.removeUserRegionByUsername(username).toPromise();
          break;
        case 'SITE':
          await this.userManagementService.removeUserSiteByUsername(username).toPromise();
          break;
      }
    }
  }
}