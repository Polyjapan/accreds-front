import {Component, OnInit} from '@angular/core';
import {AccredType} from '../../../../data/accredType';
import {MatDialogRef} from '@angular/material';
import {AccredTypesService} from '../../../../services/accredTypes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-accred-type',
  templateUrl: './create-accred-type.component.html',
  styleUrls: ['./create-accred-type.component.css']
})
export class CreateAccredTypeComponent implements OnInit {
  accredType: AccredType;
  sending = false;

  constructor(private dialogRef: MatDialogRef<CreateAccredTypeComponent>,
              private ats: AccredTypesService) {
    this.accredType = new AccredType();
    this.accredType.isTemporary = false;
    this.accredType.requiresSignature = false;
  }

  ngOnInit() {
  }

  submit($event: any) {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.ats.createAccredType(this.accredType).subscribe(res => {
      this.dialogRef.close(res);
    }, err => {
      this.sending = false;
      Swal.fire('Il y a eu un problème', undefined, 'error');
    });
  }

}
