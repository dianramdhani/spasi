import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TreeModule } from 'angular-tree-search';
import { HttpClientModule } from '@angular/common/http'
import { ChartsModule } from 'ng2-charts';
import { MomentModule } from 'ngx-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './core/wrapper/wrapper.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { SiteManagementComponent } from './pages/site-management-ct/site-management/site-management.component';
import { SiteFormComponent } from './pages/site-management-ct/site-form/site-form.component';
import { SiteManagementCtComponent } from './pages/site-management-ct/site-management-ct.component';
import { UserManagementCtComponent } from './pages/user-management-ct/user-management-ct.component';
import { ListUserComponent } from './pages/user-management-ct/list-user/list-user.component';
import { UserFormComponent } from './pages/user-management-ct/user-form/user-form.component';
import { AlertAndTicketingCtComponent } from './pages/alert-and-ticketing-ct/alert-and-ticketing-ct.component';
import { ListAlertComponent } from './pages/alert-and-ticketing-ct/list-alert/list-alert.component';
import { AlertDetailComponent } from './pages/alert-and-ticketing-ct/alert-detail/alert-detail.component';
import { ConfigDeviceComponent } from './pages/site-management-ct/config-device/config-device.component';
import { ModalSetSensorComponent } from './pages/site-management-ct/config-device/modal-set-sensor/modal-set-sensor.component';
import { SiteProfileComponent } from './pages/site-management-ct/site-profile/site-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalSiteDetailComponent } from './pages/dashboard/modal-site-detail/modal-site-detail.component';
import { SensorExplorerComponent } from './pages/sensor-explorer/sensor-explorer.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    SpinnerComponent,
    LoginComponent,
    UserComponent,
    SiteManagementComponent,
    SiteFormComponent,
    SiteManagementCtComponent,
    UserManagementCtComponent,
    ListUserComponent,
    UserFormComponent,
    AlertAndTicketingCtComponent,
    ListAlertComponent,
    AlertDetailComponent,
    ConfigDeviceComponent,
    ModalSetSensorComponent,
    SiteProfileComponent,
    DashboardComponent,
    ModalSiteDetailComponent,
    SensorExplorerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule,
    LeafletModule,
    TreeModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalSetSensorComponent,
    ModalSiteDetailComponent
  ]
})
export class AppModule { }