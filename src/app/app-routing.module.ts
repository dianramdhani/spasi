import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiteManagementCtComponent } from './pages/site-management-ct/site-management-ct.component';
import { SiteManagementComponent } from './pages/site-management-ct/site-management/site-management.component';
import { SiteFormComponent } from './pages/site-management-ct/site-form/site-form.component';
import { AllMapCtComponent } from './pages/all-map-ct/all-map-ct.component';
import { AllMapV2Component } from './pages/all-map-ct/all-map-v2/all-map-v2.component';
import { DetailDeviceComponent } from './pages/all-map-ct/detail-device/detail-device.component';
import { UserManagementCtComponent } from './pages/user-management-ct/user-management-ct.component';
import { ListUserComponent } from './pages/user-management-ct/list-user/list-user.component';
import { UserFormComponent } from './pages/user-management-ct/user-form/user-form.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'site-management', component: SiteManagementCtComponent, children: [
          { path: '', component: SiteManagementComponent },
          { path: 'site-form', component: SiteFormComponent }
        ]
      },
      {
        path: 'all-map', component: AllMapCtComponent, children: [
          { path: '', component: AllMapV2Component },
          { path: 'detail-device', component: DetailDeviceComponent },
        ]
      },
      {
        path: 'user-management', component: UserManagementCtComponent, children: [
          { path: '', component: ListUserComponent },
          { path: 'user-form', component: UserFormComponent },
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }