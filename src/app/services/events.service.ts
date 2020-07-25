import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map, shareReplay, tap} from 'rxjs/operators';
import {Event} from '../data/event';
import {AuthService} from './auth.service';
import {LoginResponse} from './login.service';

@Injectable({providedIn: 'root'})
export class EventsService {
  private event$: Observable<Event>;
  private events$: Observable<Event[]>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.event$ = this.http.get<Event>(environment.apiurl + '/event')
      .pipe(shareReplay({bufferSize: 1, refCount: true, windowTime: 600 * 1000}));
    this.events$ = this.http.get<Event[]>(environment.apiurl + '/events')
      .pipe(shareReplay({bufferSize: 1, refCount: true, windowTime: 600 * 1000}));
  }

  getEvent(): Observable<Event> {
    return this.event$;
  }

  getEvents(): Observable<Event[]> {
    return this.events$;
  }

  switchEvent(id: number): Observable<void> {
    return this.http.get<LoginResponse>(environment.apiurl + '/switchEvent/' + id)
      .pipe(
        tap(res => this.auth.changeToken(res.session)),
        map(res => undefined)
      );
  }
}
