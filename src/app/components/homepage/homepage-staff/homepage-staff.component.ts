import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateAccredModalComponent} from '../../create-accred-modal/create-accred-modal.component';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-homepage-staff',
  templateUrl: './homepage-staff.component.html',
  styleUrls: ['./homepage-staff.component.css']
})
export class HomepageStaffComponent implements OnInit {

  constructor(private dialog: MatDialog, private auth: AuthService) { }

  get isStaff() {
    return this.auth.isStaff;
  }

  ngOnInit() {
  }

  createAccred() {
    this.dialog.open(CreateAccredModalComponent);
  }
}
