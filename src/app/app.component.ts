import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from './services/auth.service';
import {RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material';
import {SwitchToStaffComponent} from './components/switch-to-staff/switch-to-staff.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private dialog: MatDialog) {
  }

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  activateRoute(event, elem: RouterOutlet) {
    // this.subUrl = elem.activatedRoute.snapshot.routeConfig.path;
  }

  logout() {
    this.auth.logout();
  }

  get isStaff() {
    return this.auth.isStaff;
  }

  switchToStaff() {
    this.dialog.open(SwitchToStaffComponent);
  }
}
