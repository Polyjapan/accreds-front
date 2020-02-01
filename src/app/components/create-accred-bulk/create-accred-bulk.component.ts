import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accred} from '../../data/accred';
import {AccredsService} from '../../services/accreds.service';
import Swal from 'sweetalert2';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-create-accred-bulk',
  templateUrl: './create-accred-bulk.component.html',
  styleUrls: ['./create-accred-bulk.component.css']
})
export class CreateAccredBulkComponent {
  accredType: number;
  vipPref: number;

  hasName = true;
  mustContactAdmin = false;
  requireRealNameOnDelivery = false;
  hasBody = true;
  hasStage = false;
  lines: string;

  @Input() successPopup = true;
  @Output() finish = new EventEmitter();

  sending = false;

  constructor(private service: AccredsService) {
  }

  get isFormatValid() {
    return this.hasBody || this.hasName || this.hasStage;
  }

  get areTypesValid() {
    return this.accredType && this.vipPref;
  }

  get expectedCols() {
    return (this.hasName ? 2 : 0) + (this.hasBody ? 1 : 0) + (this.hasStage ? 1 : 0);
  }

  get isContentValid() {
    if (!this.lines) {
      return false;
    }
    const lines = this.lines.split('\n')
      .filter(line => line.length > 0)
      .map(line => line.split(/[,\t]/).map(col => col.trim()));

    console.log(lines);
    lines.forEach((v, n) => console.log(v));

    return lines.length > 0 && lines.every(cols => cols.length >= this.expectedCols);
  }

  get exampleFormat() {
    if (!this.isFormatValid) {
      return 'Le format est invalide (doit contenir au moins un nom ou un organisme)';
    }
    let first = '';
    let second = '';
    if (this.hasName) {
      first += 'Prénom,Nom,';
      second += 'Alfred,Dabin,';
    }

    if (this.hasBody) {
      first += 'Organisme,';
      second += 'Super Association,';
    }

    if (this.hasStage) {
      first += 'Nom de scène,';
      second += 'Elvis Presdab,';
    }

    first += 'Remarques';
    second += 'Remarques Optionnelles, avec autant de virgules que souhaité';
    return first + '\n' + second;
  }

  send() {
    if (this.sending || !(this.isFormatValid && this.isContentValid && this.areTypesValid)) {
      return;
    }
    this.sending = true;

    const lineSplit = this.lines.split('\n');
    const lines = lineSplit
      .map(lineText => {
        if (lineText.length < 1) {
          return undefined;
        }

        const line = lineText.split(/[,\t]/).map(col => col.trim());
        const accred = new Accred();
        accred.eventId = 0;
        accred.authoredBy = 0;
        accred.accredTypeId = this.accredType;
        accred.preferedVipDesk = this.vipPref;
        accred.mustContactAdmin = this.mustContactAdmin;
        accred.requireRealNameOnDelivery = this.requireRealNameOnDelivery;

        if (this.hasName) {
          accred.firstname = line[0];
          accred.lastname = line[1];
        }

        if (this.hasBody) {
          accred.bodyName = line[this.hasName ? 2 : 0];
        }

        if (this.hasStage) {
          accred.stageName = line[(this.hasName ? 2 : 0) + (this.hasBody ? 1 : 0)];
        }

        if (line.length > this.expectedCols) {
          line.splice(0, this.expectedCols);
          accred.details = line.join(',');
        }

        return accred;
      });

    const index = lines
      .findIndex(line => line && (isNullOrUndefined(line.firstname) ||
        isNullOrUndefined(line.lastname)) && isNullOrUndefined(line.bodyName));

    if (index !== -1) {
      Swal.fire('Format incorrect', 'Erreur line ' + (index + 1) + ' (' + lineSplit[index] + '). ' +
        'Le nom ou l\'organisme doivent être renseignés sur chaque ligne.');
      this.sending = false;
      return;
    }

    const toSend = lines.filter(line => !isNullOrUndefined(line));

    this.service.createAccreds(toSend).subscribe(succ => {
      if (this.successPopup) {
        Swal.fire('Accréditations créées', undefined, 'success');
      }
      this.service.updateContinuousAccreds();
      this.finish.emit();
      this.sending = false;
      this.resetForm();
    }, err => {
      Swal.fire('Erreur inconnue', undefined, 'error');
      this.sending = false;
    });
  }

  private resetForm() {
    this.lines = undefined;
  }


}
