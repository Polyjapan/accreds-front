import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Accred} from '../../data/accred';
import {isNullOrUndefined} from 'util';
import {AccredsService} from '../../services/accreds.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update-accred',
  templateUrl: './create-update-accred.component.html',
  styleUrls: ['./create-update-accred.component.css']
})
export class CreateUpdateAccredComponent implements OnInit, OnChanges {
  @Input() accred: Accred;
  @Input() successPopup: boolean = true;
  @Output() finish = new EventEmitter<number>();

  sending = false;

  constructor(private service: AccredsService) {
  }

  get hasName() {
    return this.accred && this.accred.firstname && this.accred.firstname.length >= 2 &&
      this.accred.lastname && this.accred.lastname.length >= 2;
  }

  get hasBody() {
    return this.accred && this.accred.bodyName && this.accred.bodyName.length >= 2;
  }

  get hasStage() {
    return this.accred && this.accred.stageName && this.accred.stageName.length >= 2;
  }

  get isValid() {
    return this.accred && (this.hasBody || this.hasName || this.hasStage) && this.accred.preferedVipDesk && this.accred.accredTypeId;
  }

  send() {
    if (this.sending || !this.isValid) {
      return;
    }
    this.sending = true;

    this.service.createUpdateAccred(this.accred).subscribe(succ => {
      if (this.successPopup) {
        Swal.fire('Accréditation créée', undefined, 'success');
      }
      this.finish.emit(succ);
      this.service.updateContinuousAccreds();
      this.sending = false;
      this.resetForm();
    }, err => {
      Swal.fire('Erreur inconnue', undefined, 'error');
      this.sending = false;
    });
  }

  ngOnInit() {
    this.checkAccred();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAccred();
  }

  private checkAccred() {
    if (isNullOrUndefined(this.accred)) {
      this.accred = new Accred();
      this.accred.eventId = 0;
      this.accred.authoredBy = 0;
    }
  }

  private resetForm() {
    this.accred = undefined;
    this.checkAccred();
  }

}
