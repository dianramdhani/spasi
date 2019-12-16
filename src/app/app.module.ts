import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TreeModule } from 'angular-tree-search';
import { HttpClientModule } from '@angular/common/http'
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './core/wrapper/wrapper.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailDeviceComponent } from './pages/all-map-ct/detail-device/detail-device.component';
import { AllMapV2Component } from './pages/all-map-ct/all-map-v2/all-map-v2.component';
import { ModalDetailV2Component } from './pages/all-map-ct/all-map-v2/modal-detail-v2/modal-detail-v2.component';
import { SiteManagementComponent } from './pages/site-management-ct/site-management/site-management.component';
import { SiteFormComponent } from './pages/site-management-ct/site-form/site-form.component';
import { SiteManagementCtComponent } from './pages/site-management-ct/site-management-ct.component';
import { AllMapCtComponent } from './pages/all-map-ct/all-map-ct.component';
import { UserManagementCtComponent } from './pages/user-management-ct/user-management-ct.component';
import { ListUserComponent } from './pages/user-management-ct/list-user/list-user.component';
import { UserFormComponent } from './pages/user-management-ct/user-form/user-form.component';
import { AlertAndTicketingCtComponent } from './pages/alert-and-ticketing-ct/alert-and-ticketing-ct.component';
import { ListAlertComponent } from './pages/alert-and-ticketing-ct/list-alert/list-alert.component';
import { AlertDetailComponent } from './pages/alert-and-ticketing-ct/alert-detail/alert-detail.component';
import { ConfigDeviceComponent } from './pages/site-management-ct/config-device/config-device.component';
import { ModalSetSensorComponent } from './pages/site-management-ct/config-device/modal-set-sensor/modal-set-sensor.component';
import { SiteProfileComponent } from './pages/site-management-ct/site-profile/site-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    SpinnerComponent,
    LoginComponent,
    UserComponent,
    DetailDeviceComponent,
    AllMapV2Component,
    ModalDetailV2Component,
    SiteManagementComponent,
    SiteFormComponent,
    SiteManagementCtComponent,
    AllMapCtComponent,
    UserManagementCtComponent,
    ListUserComponent,
    UserFormComponent,
    AlertAndTicketingCtComponent,
    ListAlertComponent,
    AlertDetailComponent,
    ConfigDeviceComponent,
    ModalSetSensorComponent,
    SiteProfileComponent,
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
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalDetailV2Component,
    ModalSetSensorComponent
  ]
})
export class AppModule { }
