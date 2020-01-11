import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccredsService} from '../../services/accreds.service';

@Component({
  selector: 'app-create-accred-modal',
  templateUrl: './create-accred-modal.component.html',
  styleUrls: ['./create-accred-modal.component.css']
})
export class CreateAccredModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateAccredModalComponent>,
              private accredsService: AccredsService,
              @Inject(MAT_DIALOG_DATA) private accredId: number) {
  }

  ngOnInit() {
  }

  close() {
    this.accredsService.updateContinuousAccreds();
    this.dialogRef.close();
  }


}
