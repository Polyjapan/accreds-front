import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequireLoginComponent} from './components/accounts/require-login/require-login.component';
import {LoginFailedComponent} from './components/accounts/login-failed/login-failed.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HomepageStaffComponent} from './components/homepage/homepage-staff/homepage-staff.component';
import {AccredTypeMappingComponent} from './components/accred-type-mapping/accred-type-mapping.component';


const routes: Routes = [
  {path: 'require-login', component: RequireLoginComponent},
  {path: 'login-failed', component: LoginFailedComponent},
  {path: 'login-failed/:details', component: LoginFailedComponent},
  {path: '', component: HomepageComponent, canActivate: [PermissionAuthGuard]},
  {path: 'staff', component: HomepageStaffComponent, canActivate: [PermissionAuthGuard]},
  {path: 'mapping', component: AccredTypeMappingComponent, canActivate: [PermissionAuthGuard], data: {group: 'securite'}},
  {
    path: '**',
    canActivate: [PermissionAuthGuard],
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

