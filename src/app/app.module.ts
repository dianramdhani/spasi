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
import { DataTablesModule } from 'angular-datatables';

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
import { HealthHistoryComponent } from './pages/site-management-ct/health-history/health-history.component';
import { ReportingCtComponent } from './pages/reporting-ct/reporting-ct.component';
import { PlnVsBlComponent } from './pages/reporting-ct/pln-vs-bl/pln-vs-bl.component';
import { PlnVsRlComponent } from './pages/reporting-ct/pln-vs-rl/pln-vs-rl.component';
import { CommonModule } from '@angular/common';
import { HealthHistoryWidgetComponent } from './pages/site-management-ct/site-profile/health-history-widget/health-history-widget.component';
import { HealthHistoryV2Component } from './pages/site-management-ct/health-history-v2/health-history-v2.component';
import { HealthHistoryWidgetV2Component } from './pages/site-management-ct/site-profile/health-history-widget-v2/health-history-widget-v2.component';
import { HealthHistoryWidgetV3Component } from './pages/site-management-ct/site-profile/health-history-widget-v3/health-history-widget-v3.component';
import { SensorCompareComponent } from './pages/site-management-ct/site-profile/sensor-compare/sensor-compare.component';
import { SiteProfileV2Component } from './pages/site-management-ct/site-profile-v2/site-profile-v2.component';
import { ItemComponent } from './pages/site-management-ct/site-profile-v2/item/item.component';
import { SiteProfileV3Component } from './pages/site-management-ct/site-profile-v3/site-profile-v3.component';

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
    HealthHistoryComponent,
    ReportingCtComponent,
    PlnVsBlComponent,
    PlnVsRlComponent,
    HealthHistoryWidgetComponent,
    HealthHistoryV2Component,
    HealthHistoryWidgetV2Component,
    HealthHistoryWidgetV3Component,
    SensorCompareComponent,
    SiteProfileV2Component,
    ItemComponent,
    SiteProfileV3Component,
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
    MomentModule,
    DataTablesModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalSetSensorComponent,
    ModalSiteDetailComponent
  ]
})
export class AppModule { }