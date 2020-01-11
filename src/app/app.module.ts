import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LoginFailedComponent} from './components/accounts/login-failed/login-failed.component';
import {RequireLoginComponent} from './components/accounts/require-login/require-login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule, MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import {AuthService} from './services/auth.service';
import {LoginService} from './services/login.service';
import {HttpClientModule} from '@angular/common/http';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepageComiteComponent } from './components/homepage/homepage-comite/homepage-comite.component';
import { AccredsListComponent } from './components/accreds-list/accreds-list.component';
import { CreateAccredTypeComponent } from './components/selectors/select-accred-type/create-accred-type/create-accred-type.component';
import {SelectAccredTypeComponent} from './components/selectors/select-accred-type/select-accred-type.component';
import {FormsModule} from '@angular/forms';
import { CreateUpdateAccredComponent } from './components/create-update-accred/create-update-accred.component';
import {CreateVipDeskComponent} from './components/selectors/select-vip-desk/create-vip-desk/create-vip-desk.component';
import {SelectVipDeskComponent} from './components/selectors/select-vip-desk/select-vip-desk.component';
import { CreateAccredBulkComponent } from './components/create-accred-bulk/create-accred-bulk.component';
import { UpdateAccredModalComponent } from './components/update-accred-modal/update-accred-modal.component';
import { HomepageStaffComponent } from './components/homepage/homepage-staff/homepage-staff.component';
import { AccredStaffDetailsComponent } from './components/accred-staff-details/accred-staff-details.component';
import { SwitchToStaffComponent } from './components/switch-to-staff/switch-to-staff.component';
import { CreateAccredModalComponent } from './components/create-accred-modal/create-accred-modal.component';


export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFailedComponent,
    RequireLoginComponent,
    NotFoundComponent,
    HomepageComponent,
    HomepageComiteComponent,
    AccredsListComponent,
    CreateAccredTypeComponent,
    SelectAccredTypeComponent,
    CreateUpdateAccredComponent,
    CreateVipDeskComponent,
    SelectVipDeskComponent,
    CreateAccredBulkComponent,
    UpdateAccredModalComponent,
    HomepageStaffComponent,
    AccredStaffDetailsComponent,
    SwitchToStaffComponent,
    CreateAccredModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.apidomain]
      }
    }),
    FlexModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule,
    MatMenuModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    CreateAccredTypeComponent,
    CreateVipDeskComponent,
    UpdateAccredModalComponent,
    AccredStaffDetailsComponent,
    SwitchToStaffComponent,
    CreateAccredModalComponent
  ],
  providers: [
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
