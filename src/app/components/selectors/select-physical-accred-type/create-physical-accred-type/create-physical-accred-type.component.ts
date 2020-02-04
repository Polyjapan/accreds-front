import {Component, OnInit} from '@angular/core';
import {PhysicalAccredType} from '../../../../data/accredType';
import {PhysicalAccredTypesService} from '../../../../services/physicalAccredTypes.service';
import {MatDialogRef} from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-physical-accred-type',
  templateUrl: './create-physical-accred-type.component.html',
  styleUrls: ['./create-physical-accred-type.component.css']
})
export class CreatePhysicalAccredTypeComponent implements OnInit {
  accredType: PhysicalAccredType;
  sending = false;

  constructor(private dialogRef: MatDialogRef<CreatePhysicalAccredTypeComponent>,
              private ats: PhysicalAccredTypesService) {
    this.accredType = new PhysicalAccredType();
    this.accredType.physicalAccredTypeNumbered = false;
  }

  ngOnInit() {
  }

  submit($event: any) {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.ats.createPhysicalAccredType(this.accredType).subscribe(res => {
      this.dialogRef.close(res);
    }, err => {
      this.sending = false;
      Swal.fire('Il y a eu un problème', undefined, 'error');
    });
  }

}
