import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoginService} from '../../services/login.service';
import {isNullOrUndefined} from 'util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-switch-to-staff',
  templateUrl: './switch-to-staff.component.html',
  styleUrls: ['./switch-to-staff.component.css']
})
export class SwitchToStaffComponent implements OnInit {
  desk: number;
  name: string;
  sending = false;

  constructor(private auth: AuthService, private login: LoginService) {
  }

  get isValid() {
    return !isNullOrUndefined(this.desk) && !isNullOrUndefined(this.name) && this.name.trim() !== '';
  }

  ngOnInit() {
  }

  submit() {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.login.staffMode(this.desk, this.name).subscribe(res => this.auth.switchToStaff(res.session),
      err => {
        this.sending = false;
        Swal.fire('Une erreur s\'est produite', undefined, 'error');
      });
  }

}
