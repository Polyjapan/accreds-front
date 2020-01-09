import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import Swal from 'sweetalert2';
import {VipDesk} from '../../../../data/vipDesk';
import {VipDesksService} from '../../../../services/vipDesks.service';

@Component({
  selector: 'app-create-vip-desk',
  templateUrl: './create-vip-desk.component.html',
  styleUrls: ['./create-vip-desk.component.css']
})
export class CreateVipDeskComponent implements OnInit {
  desk: VipDesk;
  sending = false;

  constructor(private dialogRef: MatDialogRef<CreateVipDeskComponent>,
              private vds: VipDesksService) {
    this.desk = new VipDesk();
  }

  ngOnInit() {
  }

  submit($event: any) {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.vds.createVipDesk(this.desk).subscribe(res => {
      this.dialogRef.close(res);
    }, err => {
      this.sending = false;
      Swal.fire('Il y a eu un problème', undefined, 'error');
    });
  }

}
