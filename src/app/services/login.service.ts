import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {
  private loginUrl = environment.apiurl + '/login';
  private delegationUrl = environment.apiurl + '/delegationKey';
  private staffModeUrl = environment.apiurl + '/staffMode';

  constructor(private http: HttpClient) {
  }

  login(ticket: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.loginUrl + '/' + ticket);
  }

  getDelegationKey(): Observable<string> {
    return this.http.get(this.delegationUrl, {responseType: 'text'});
  }

  staffMode(vipDeskId: number, name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.staffModeUrl, {vipDeskId, name});
  }
}

export class LoginResponse {
  session: string;
}
