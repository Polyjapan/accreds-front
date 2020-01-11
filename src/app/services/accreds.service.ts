import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Accred, FullAccred} from '../data/accred';
import {map, switchMap} from 'rxjs/operators';
import {FullAccredType} from '../data/accredType';
import {AccredTypesService} from './accredTypes.service';
import {VipDesksService} from './vipDesks.service';
import {VipDesk} from '../data/vipDesk';

@Injectable({providedIn: 'root'})
export class AccredsService {
  private stream = new BehaviorSubject<FullAccred[]>([]);


  constructor(private http: HttpClient, private types: AccredTypesService, private desks: VipDesksService) {
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
        switchMap(desks => this.types.getAccredTypes().pipe(
          map(types => {
            const typeMap = new Map<number, FullAccredType>();
            const deskMap = new Map<number, string>();
            types.forEach(tpe => typeMap.set(tpe.accredType.accredTypeId, tpe));
            desks.forEach(desk => deskMap.set(desk.vipDeskId, desk.vipDeskName));

            return accreds.map(accred => {
              return {accred, type: typeMap.get(accred.accredTypeId), desk: deskMap.get(accred.preferedVipDesk)};
            });
          }))))));
  }

  createUpdateAccred(accred: Accred): Observable<number> {
    if (accred.accredId) {
      return this.http.put<boolean>(environment.apiurl + '/accreds/' + accred.accredId, accred)
        .pipe(map(succ => accred.accredId));
    } else {
      return this.http.post<number>(environment.apiurl + '/accreds', accred);
    }
  }

  deleteAccred(accred: number): Observable<void> {
    return this.http.delete<void>(environment.apiurl + '/accreds/' + accred);
  }

  createAccreds(accreds: Accred[]) {
    return this.http.post<void>(environment.apiurl + '/accreds/multiple', accreds);
  }
}
