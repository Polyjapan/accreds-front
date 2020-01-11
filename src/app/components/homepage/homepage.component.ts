import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  get isStaff() {
    return this.auth.isStaff;
  }

  ngOnInit() {
    console.log(this.auth.getToken());
  }

}
