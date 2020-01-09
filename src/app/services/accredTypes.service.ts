import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncSubject, BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AccredType, FullAccredType} from '../data/accredType';

@Injectable({providedIn: 'root'})
export class AccredTypesService {
  private types = new BehaviorSubject<FullAccredType[]>([]);
  private lastPull = 0;

  constructor(private http: HttpClient) {
  }

  forceRefresh(): Observable<void> {
    this.lastPull = 0;
    return this.pullIfNeeded();
  }

  getAccredTypes(): Observable<FullAccredType[]> {
    this.pullIfNeeded();
    return this.types;
  }

  createAccredType(tpe: AccredType): Observable<number> {
    return this.http.post<number>(environment.apiurl + '/accredTypes', tpe);
  }

  private pullIfNeeded(): Observable<void> {
    const now = Date.now();
    const update = new AsyncSubject<void>();
    update.next(null);

    if (now - this.lastPull > (60 * 1000)) {
      this.http.get<FullAccredType[]>(environment.apiurl + '/fullAccredTypes').subscribe(res => {
        this.types.next(res);
        update.complete();
      });
      this.lastPull = now;
    } else {
      update.complete();
    }

    return update;
  }
}
