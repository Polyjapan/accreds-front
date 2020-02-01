import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Accred, AccredStatus, FullAccred} from '../data/accred';
import {map, switchMap} from 'rxjs/operators';
import {FullAccredType} from '../data/accredType';
import {AccredTypesService} from './accredTypes.service';
import {VipDesksService} from './vipDesks.service';
import {AdminsService} from './admins.service';
import {User} from '../data/user';

@Injectable({providedIn: 'root'})
export class AccredsService {
  private stream = new BehaviorSubject<FullAccred[]>([]);


  constructor(private http: HttpClient, private types: AccredTypesService, private desks: VipDesksService, private people: AdminsService) {
  }

  getAccreds(): Observable<Accred[]> {
    return this.http.get<Accred[]>(environment.apiurl + '/accreds');
  }

  updateContinuousAccreds() {
    this.getFullAccreds().subscribe(res => this.stream.next(res));
  }

  getAccredsContinuous(): Observable<FullAccred[]> {
    this.updateContinuousAccreds();
    return this.stream;
  }

  getAccred(id: number): Observable<Accred> {
    return this.http.get<Accred>(environment.apiurl + '/accreds/' + id);
  }

  getFullAccreds(): Observable<FullAccred[]> {
    return this.getAccreds().pipe(
      switchMap(accreds => this.desks.getVipDesks().pipe(
        switchMap(desks => this.people.getUsers().pipe(
          switchMap(users => this.types.getAccredTypes().pipe(
            map(types => {
              const typeMap = new Map<number, FullAccredType>();
              const userMap = new Map<number, User>();
              const deskMap = new Map<number, string>();
              types.forEach(tpe => typeMap.set(tpe.accredType.accredTypeId, tpe));
              users.forEach(user => userMap.set(user.id, user));
              desks.forEach(desk => deskMap.set(desk.vipDeskId, desk.vipDeskName));

              return accreds.map(accred => {
                return {
                  accred,
                  type: typeMap.get(accred.accredTypeId),
                  desk: deskMap.get(accred.preferedVipDesk),
                  author: userMap.get(accred.authoredBy)
                };
              });
            }))))))));
  }

  createUpdateAccred(accred: Accred): Observable<number> {
    if (accred.accredId) {
      return this.http.put<boolean>(environment.apiurl + '/accreds/' + accred.accredId, accred)
        .pipe(map(succ => accred.accredId));
    } else {
      return this.http.post<number>(environment.apiurl + '/accreds', accred);
    }
  }

  createAccredDelegated(accred: Accred, delegationKey: string): Observable<number> {
    return this.http.post<number>(environment.apiurl + '/accreds/delegated', {accred, delegationKey});
  }

  deleteAccred(accred: number): Observable<void> {
    return this.http.delete<void>(environment.apiurl + '/accreds/' + accred);
  }

  createAccreds(accreds: Accred[]) {
    return this.http.post<void>(environment.apiurl + '/accreds/multiple', accreds);
  }

  // tslint:disable-next-line:variable-name
  setDelivered(accred: number, remarks?: string, firstName?: string, lastName?: string, number?: string) {
    return this.setStatus(accred, AccredStatus.DELIVERED, remarks, firstName, lastName, number);
  }

  // tslint:disable-next-line:variable-name
  private setStatus(accred: number, status: AccredStatus, remarks?: string, firstName?: string, lastName?: string, number?: string) {
    return this.http.put<void>(environment.apiurl + '/accreds/' + accred + '/state', {targetState: status, remarks, firstName, lastName, number});
  }

  // tslint:disable-next-line:variable-name
  setRecovered(accred: number, remarks?: string, number?: string) {
    return this.setStatus(accred, AccredStatus.RECOVERED, remarks, undefined, undefined, number);
  }
}
