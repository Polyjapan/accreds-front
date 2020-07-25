import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from './services/auth.service';
import {RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material';
import {SwitchToStaffComponent} from './components/switch-to-staff/switch-to-staff.component';
import {LoginService} from './services/login.service';
import Swal from 'sweetalert2';
import {EventsService} from './services/events.service';
import {Event} from './data/event';

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

  event: Observable<Event>;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private dialog: MatDialog, private login: LoginService,
              private events: EventsService) {
    this.event = events.getEvent();
  }

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  get isAdmin() {
    return this.auth.isAdmin();
  }

  get isSecu() {
    return this.auth.isAuthenticated() && this.auth.hasGroup('securite');
  }

  get isStaff() {
    return this.auth.isStaff;
  }

  activateRoute(event, elem: RouterOutlet) {
    // this.subUrl = elem.activatedRoute.snapshot.routeConfig.path;
  }

  logout() {
    this.auth.logout();
  }

  switchToStaff() {
    this.dialog.open(SwitchToStaffComponent);
  }

  generateDelegationKey() {
    this.login.getDelegationKey().subscribe(res => {
      const key = res.slice(0, 4) + '-' + res.slice(4);

      Swal.fire({
        title: 'Clé de délégation',
        html: `
<p>Voici votre clé de délégation. Elle est valable <b>120 secondes</b>.
 Elle permet à un staff de créer une accréditation en votre nom en cas d\'urgence.</p><h2><code>` + key + `</code></h2>`,
        timer: 100000,
        timerProgressBar: true
      });
    }, err => {
      console.log(err);
      Swal.fire('Oups', 'Impossible d\'obtenir une clé de délégation. Réessayez plus tard.', 'error')
    });
  }
}
