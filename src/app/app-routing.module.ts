import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequireLoginComponent} from './components/accounts/require-login/require-login.component';
import {LoginFailedComponent} from './components/accounts/login-failed/login-failed.component';
import {PermissionAuthGuard} from './services/permission-auth-guard.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {HomepageStaffComponent} from './components/homepage/homepage-staff/homepage-staff.component';


const routes: Routes = [
  {path: 'require-login', component: RequireLoginComponent},
  {path: 'login-failed', component: LoginFailedComponent},
  {path: 'login-failed/:details', component: LoginFailedComponent},
  {path: '', component: HomepageComponent, canActivate: [PermissionAuthGuard]},
  {path: 'staff', component: HomepageStaffComponent, canActivate: [PermissionAuthGuard]}, // temporary ?

  // Protected paths
/*
  {path: 'storages', component: StorageLocationsComponent, canActivate: [PermissionAuthGuard]},
  {path: 'storages/:id', component: ShowStorageLocationComponent, canActivate: [PermissionAuthGuard]},

  {path: 'object-types', component: ObjectTypesComponent, canActivate: [PermissionAuthGuard]},
  {path: 'object-types/create', component: CreateObjectTypeComponent, canActivate: [PermissionAuthGuard]},
  {path: 'object-types/:typeId', component: ShowObjectTypeComponent, canActivate: [PermissionAuthGuard]},
  {path: 'object-types/edit/:typeId', component: CreateObjectTypeComponent, canActivate: [PermissionAuthGuard]},

  {path: 'objects/:id', component: ObjectComponent, canActivate: [PermissionAuthGuard]},

  {path: 'tidying', component: TidyingComponent, canActivate: [PermissionAuthGuard]},
  {path: 'returns', component: ReturnsComponent, canActivate: [PermissionAuthGuard]},

  {path: 'external-loans', component: ExternalLoansComponent, canActivate: [PermissionAuthGuard]},
  {path: 'external-loans/create', component: CreateExternalLoanComponent, canActivate: [PermissionAuthGuard]},
  {path: 'external-loans/:id', component: ViewExternalLoanComponent, canActivate: [PermissionAuthGuard]},*/

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

