import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EventsService} from '../../services/events.service';
import {Observable} from 'rxjs';
import {Event} from '../../data/event';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  event$: Observable<Event>;

  constructor(private auth: AuthService, private event: EventsService) {
    this.event$ = event.getEvent();
  }

  get isStaff() {
    return this.auth.isStaff;
  }

  ngOnInit() {
    console.log(this.auth.getToken());
  }

}
