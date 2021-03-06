import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router, UrlTree} from '@angular/router';
import {environment} from '../../environments/environment';
import {isNullOrUndefined} from 'util';

export class UserSession {
  groups?: string[];
  userId?: number;
  staffUserId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private route: Router) {
  }

  get isStaff() {
    return this.isAuthenticated() && this.getToken().staffUserId;
  }

  login(token: string): UrlTree {
    localStorage.setItem('id_token', token);
    let act = this.loadNextAction();

    if (!act || act.startsWith('/?ticket=')) {
      act = '/';
    }

    return this.route.createUrlTree([act]);
  }

  public changeToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  requiresLogin(redirectTo: string): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.storeNextAction(redirectTo);
      return false;
    }
  }

  requiresGroup(redirectTo: string, group: string): boolean {
    if (this.requiresLogin(redirectTo)) {
      return this.hasGroup(group);
    }
    return false;
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    const staff = this.isStaff;
    localStorage.removeItem('id_token');

    if (!staff) {
      window.location.replace(environment.auth.apiurl + '/logout?service=' + window.location.origin);
    } else {
      window.location.reload();
    }
  }

  public switchToStaff(token: string): void {
    localStorage.setItem('id_token', token);
    window.location.replace(environment.auth.apiurl + '/logout?service=' + window.location.origin);
  }

  public getEvent(): number {
    const token = localStorage.getItem('id_token');
    const decoded = this.jwtHelper.decodeToken(token);

    if (decoded && decoded.event) {
      return decoded.event as number;
    } else {
      return undefined;
    }
  }

  public getToken(): UserSession {
    const token = localStorage.getItem('id_token');
    const decoded = this.jwtHelper.decodeToken(token);

    if (decoded && decoded.user) {
      return decoded.user as UserSession;
    } else {
      return null;
    }
  }

  public hasGroup(group: string): boolean {
    const token = this.getToken();
    if (this.isAuthenticated() && token) {
      return token.groups && token.groups.indexOf(group) !== -1;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    const token = this.getToken();
    if (this.isAuthenticated() && token) {
      return !isNullOrUndefined(token.userId);
    } else {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');

    if (token === null) {
      return false;
    }

    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private storeNextAction(action: string) {
    localStorage.setItem('_post_login_action', action);
  }

  private loadNextAction(): string {
    const act = localStorage.getItem('_post_login_action');
    localStorage.removeItem('_post_login_action');

    return act;
  }
}
