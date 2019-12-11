import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TreeModule } from 'angular-tree-search';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './core/wrapper/wrapper.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { AlertComponent } from './core/alert/alert.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailDeviceComponent } from './pages/detail-device/detail-device.component';
import { AllMapV2Component } from './pages/all-map-v2/all-map-v2.component';
import { ModalDetailV2Component } from './pages/all-map-v2/modal-detail-v2/modal-detail-v2.component';
import { SiteManagementComponent } from './pages/site-management/site-management.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    SpinnerComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    DetailDeviceComponent,
    AllMapV2Component,
    ModalDetailV2Component,
    SiteManagementComponent
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule,
    LeafletModule,
    TreeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // AlertComponent,
    ModalDetailV2Component
  ]
})
export class AppModule { }
