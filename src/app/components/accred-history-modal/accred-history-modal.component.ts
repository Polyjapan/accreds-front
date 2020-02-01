import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccredsService} from '../../services/accreds.service';
import {Accred, statusToString} from '../../data/accred';
import {FullAccredLog} from '../../data/accredLog';
import {AdminsService} from '../../services/admins.service';

@Component({
  selector: 'app-accred-history-modal',
  templateUrl: './accred-history-modal.component.html',
  styleUrls: ['./accred-history-modal.component.css']
})
export class AccredHistoryModalComponent implements OnInit {
  logs: FullAccredLog[];
  columns = ['timestamp', 'author', 'sourceState', 'targetState', 'accredNumber', 'remarks'];
  statusToString = statusToString;

  constructor(private dialogRef: MatDialogRef<AccredHistoryModalComponent>,
              private accredsService: AccredsService, private people: AdminsService,
              @Inject(MAT_DIALOG_DATA) public accred: Accred) {
  }

  ngOnInit() {
    this.accredsService.getLogs(this.accred.accredId).subscribe(res => {
      this.logs = res;
      console.log(this.logs);
    });
  }

  close() {
    this.dialogRef.close();
  }

  findAuthor(e: FullAccredLog): string {
    if (e.staff) {
      return 'Accueil VIP ' + e.staff.vipDesk.vipDeskName + ' - ' + e.staff.account.name;
    } else if (e.admin) {
      return e.admin.details.firstName + ' ' + e.admin.details.lastName;
    } else {
      return 'Inconnu';
    }
  }
}
