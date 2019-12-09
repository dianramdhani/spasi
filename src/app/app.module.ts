import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './core/wrapper/wrapper.component';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { AlertComponent } from './core/alert/alert.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllMapComponent } from './pages/all-map/all-map.component';
import { DetailDeviceComponent } from './pages/detail-device/detail-device.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    SpinnerComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    AllMapComponent,
    DetailDeviceComponent
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule, 
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    // AlertComponent
  ]
})
export class AppModule { }
