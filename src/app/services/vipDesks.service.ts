import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncSubject, BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AccredType, FullAccredType} from '../data/accredType';
import {VipDesk} from '../data/vipDesk';

@Injectable({providedIn: 'root'})
export class VipDesksService {
  private desks = new BehaviorSubject<VipDesk[]>([]);
  private lastPull = 0;

  constructor(private http: HttpClient) {
  }

  forceRefresh(): Observable<void> {
    this.lastPull = 0;
    return this.pullIfNeeded();
  }

  getVipDesks(): Observable<VipDesk[]> {
    this.pullIfNeeded();
    return this.desks;
  }

  createVipDesk(desk: VipDesk): Observable<number> {
    return this.http.post<number>(environment.apiurl + '/vipDesks', desk);
  }

  private pullIfNeeded(): Observable<void> {
    const now = Date.now();
    const update = new AsyncSubject<void>();
    update.next(null);

    if (now - this.lastPull > (60 * 1000)) {
      this.http.get<VipDesk[]>(environment.apiurl + '/vipDesks').subscribe(res => {
        this.desks.next(res);
        update.complete();
      });
      this.lastPull = now;
    } else {
      update.complete();
    }

    return update;
  }
}
