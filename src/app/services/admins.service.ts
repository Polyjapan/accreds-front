import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../data/user';

@Injectable({providedIn: 'root'})
export class AdminsService {
  private admins = new BehaviorSubject<User[]>([]);
  private lastPull = 0;

  constructor(private http: HttpClient) {
  }

  forceRefresh() {
    this.lastPull = 0;
    this.pullIfNeeded();
  }

  getUsers(): Observable<User[]> {
    this.pullIfNeeded();
    return this.admins;
  }

  private pullIfNeeded() {
    const now = Date.now();
    if (now - this.lastPull > (600 * 1000)) {
      this.http.get<User[]>(environment.apiurl + '/people/admins').subscribe(res => {
        this.admins.next(res);
      });
      this.lastPull = now;
    }
  }
}
