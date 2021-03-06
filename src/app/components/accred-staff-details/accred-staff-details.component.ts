import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccredsService} from '../../services/accreds.service';
import {AccredStatus, FullAccred} from '../../data/accred';
import Swal from 'sweetalert2';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-accred-staff-details',
  templateUrl: './accred-staff-details.component.html',
  styleUrls: ['./accred-staff-details.component.css']
})
export class AccredStaffDetailsComponent implements OnInit {
  Status = AccredStatus;

  signed = false;
  contacted = false;
  informed = false;
  recovered = false;

  firstName: string = undefined;
  lastName: string = undefined;
  accredNumber: string = undefined;

  remarks = '';

  working = false;

  constructor(private dialogRef: MatDialogRef<AccredStaffDetailsComponent>,
              private accredsService: AccredsService,
              @Inject(MAT_DIALOG_DATA) public accred: FullAccred,
              private as: AccredsService) {
    this.firstName = accred.accred.firstname;
    this.lastName = accred.accred.lastname;
  }

  get nameRequired() {
    return this.accred.accred.requireRealNameOnDelivery && (isNullOrUndefined(this.accred.accred.firstname) || isNullOrUndefined(this.accred.accred.lastname) || this.accred.accred.firstname.trim() === '' || this.accred.accred.lastname.trim() === '');
  }

  get nameOkay() {
    return !this.nameRequired || (!isNullOrUndefined(this.firstName) && !isNullOrUndefined(this.lastName) && this.firstName.trim() !== '' && this.lastName.trim() !== '');
  }

  get numberOkay() {
    return !this.accred.type.physicalAccredType.physicalAccredTypeNumbered || (!isNullOrUndefined(this.accredNumber) && this.accredNumber.trim() !== '');
  }

  get canValidate() {
    return (!this.accred.type.accredType.isTemporary || this.informed) &&
      (!this.accred.type.accredType.requiresSignature || this.signed) &&
      (!this.accred.accred.mustContactAdmin || this.contacted) &&
      this.nameOkay && this.numberOkay;
  }


  get canRecover() {
    return this.recovered && this.numberOkay;
  }

  ngOnInit() {
  }

  confirmArrival() {
    if (this.working) {
      return;
    }
    this.working = true;

    this.as.setDelivered(this.accred.accred.accredId, this.remarks, this.firstName, this.lastName, this.accredNumber).subscribe(
      succ => {
        const nameExt = this.accred.type.physicalAccredType.physicalAccredTypeNumbered ? ' ' + this.accredNumber : '';

        Swal.fire({
          titleText: 'C\'est tout bon !',
          html: 'Le contact a bien été accueilli !<br>Vous pouvez lui délivrer son accréditation : <b>' +
            this.accred.type.physicalAccredType.physicalAccredTypeName + nameExt + '</b>',
          icon: 'success'
        });
        this.working = false;
        this.accredsService.updateContinuousAccreds();
        this.dialogRef.close();
      },
      err => {
        Swal.fire({
          titleText: 'Erreur !',
          html: 'Une erreur s\'est produite. Merci de noter sur une feuille les informations du contact accueilli ainsi que l\'heure et ' +
            'de lui délivrer son accréditation : <br><b>' + this.accred.type.physicalAccredType.physicalAccredTypeName + '</b>',
          icon: 'error'
        });
        this.working = false;
        this.accredsService.updateContinuousAccreds();
        this.dialogRef.close();
      }
    );
  }

  confirmDeparture() {
    if (this.working) {
      return;
    }
    this.working = true;

    this.as.setRecovered(this.accred.accred.accredId, this.remarks, this.accredNumber).subscribe(
      succ => {
        Swal.fire({
          titleText: 'C\'est tout bon !',
          html: 'Le contact est marqué comme parti !<br>Vous pouvez désormais le relacher dans le monde extérieur :D',
          icon: 'success'
        });
        this.working = false;
        this.accredsService.updateContinuousAccreds();
        this.dialogRef.close();
      },
      err => {
        Swal.fire({
          titleText: 'Erreur !',
          html: 'Une erreur s\'est produite. Merci de noter sur une feuille les informations du contact ainsi que l\'heure, avant de ' +
            'laisser repartir le contact.',
          icon: 'error'
        });
        this.working = false;
        this.accredsService.updateContinuousAccreds();
        this.dialogRef.close();
      }
    );
  }

}
