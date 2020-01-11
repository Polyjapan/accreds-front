import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccredsService} from '../../services/accreds.service';
import Swal from 'sweetalert2';
import {Accred} from '../../data/accred';

@Component({
  selector: 'app-update-accred-modal',
  templateUrl: './update-accred-modal.component.html',
  styleUrls: ['./update-accred-modal.component.css']
})
export class UpdateAccredModalComponent implements OnInit {
  accred: Accred;

  constructor(private dialogRef: MatDialogRef<UpdateAccredModalComponent>,
              private accredsService: AccredsService,
              @Inject(MAT_DIALOG_DATA) private accredId: number) {
  }

  ngOnInit() {
    this.accredsService.getAccred(this.accredId)
      .subscribe(accred => this.accred = accred, err => {
        Swal.fire('Oups', 'Une erreur s\'est produite... On dirait que cette accréditation n\'existe plus.', 'error');
        this.dialogRef.close();
      });
  }

  close() {
    this.accredsService.updateContinuousAccreds();
    this.dialogRef.close();
  }

}
