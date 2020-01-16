import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './services';

import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { SiteManagementCtComponent } from './pages/site-management-ct/site-management-ct.component';
import { SiteManagementComponent } from './pages/site-management-ct/site-management/site-management.component';
import { SiteFormComponent } from './pages/site-management-ct/site-form/site-form.component';
import { UserManagementCtComponent } from './pages/user-management-ct/user-management-ct.component';
import { ListUserComponent } from './pages/user-management-ct/list-user/list-user.component';
import { UserFormComponent } from './pages/user-management-ct/user-form/user-form.component';
import { AlertAndTicketingCtComponent } from './pages/alert-and-ticketing-ct/alert-and-ticketing-ct.component';
import { ListAlertComponent } from './pages/alert-and-ticketing-ct/list-alert/list-alert.component';
import { AlertDetailComponent } from './pages/alert-and-ticketing-ct/alert-detail/alert-detail.component';
import { ConfigDeviceComponent } from './pages/site-management-ct/config-device/config-device.component';
import { SiteProfileComponent } from './pages/site-management-ct/site-profile/site-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SensorExplorerComponent } from './pages/sensor-explorer/sensor-explorer.component';
import { HealthHistoryComponent } from './pages/site-management-ct/health-history/health-history.component';
import { DataCollectionComponent } from './pages/site-management-ct/data-collection/data-collection.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: UserComponent, canActivate: [LoginGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'site-management', component: SiteManagementCtComponent, children: [
          { path: '', component: SiteManagementComponent },
          { path: 'site-form', component: SiteFormComponent },
          { path: 'data-collection', component: DataCollectionComponent },
          { path: 'config-device/:siteId', component: ConfigDeviceComponent },
          { path: 'site-profile/:siteId', component: SiteProfileComponent },
          { path: 'health-history/:assetPropertyId', component: HealthHistoryComponent },
        ]
      },
      {
        path: 'user-management', component: UserManagementCtComponent, children: [
          { path: '', component: ListUserComponent },
          { path: 'user-form', component: UserFormComponent },
        ]
      },
      {
        path: 'alert-and-ticketing', component: AlertAndTicketingCtComponent, children: [
          { path: '', component: ListAlertComponent },
          { path: 'alert-detail', component: AlertDetailComponent },
        ]
      },
      { path: 'sensor-explorer', component: SensorExplorerComponent },
    ]
  },
  { path: '**', redirectTo: '/user/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }