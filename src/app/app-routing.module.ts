import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiteManagementComponent } from './pages/site-management/site-management.component';
import { AllMapV2Component } from './pages/all-map-v2/all-map-v2.component';
import { DetailDeviceComponent } from './pages/detail-device/detail-device.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'site-management', component: SiteManagementComponent },
      { path: 'all-map', component: AllMapV2Component },
      { path: 'detail-device', component: DetailDeviceComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }