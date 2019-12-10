import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllMapComponent } from './pages/all-map/all-map.component';
import { DetailDeviceComponent } from './pages/detail-device/detail-device.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'all-map', component: AllMapComponent },
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