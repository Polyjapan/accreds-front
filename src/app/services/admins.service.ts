import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../data/user';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AdminsService {
  private admins = new BehaviorSubject<User[]>([]);
  private adminsMap = this.admins.pipe(map(users => {
    const userMap = new Map<number, User>();
    users.forEach(user => userMap.set(user.id, user));

    return userMap;
  }));

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

  getUsersMap(): Observable<Map<number, User>> {
    this.pullIfNeeded();

    return this.adminsMap;
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
