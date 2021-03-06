import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Accred} from '../../data/accred';
import {isNullOrUndefined} from 'util';
import {AccredsService} from '../../services/accreds.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';

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

  constructor(private service: AccredsService, private auth: AuthService) {
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

    if (this.accred.authoredBy && this.auth.getToken().userId !== this.accred.authoredBy) {
      Swal.fire({
        input: 'text',
        inputValidator: (inputValue: string) => {
          return (!inputValue || inputValue !== 'Mes intentions sont mauvaises') && 'Merci de saisir la valeur demandée';
        },
        titleText: 'Confirmer vos mauvaises intentions',
        html: 'Vous êtes en train de modifier une accred créée par une autre personne que vous. Si c\'est bien ce que vous voulez faire, ' +
          'tapez <b>Mes intentions sont mauvaises</b> dans la boite ci dessous',
        showConfirmButton: true,
        showCancelButton: true
      }).then(result => {
        if (result && result.value && result.value === 'Mes intentions sont mauvaises') {
          this.doSend();
        } else {
          this.sending = false;
        }
      });
    } else {
      this.doSend();
    }
  }

  ngOnInit() {
    this.checkAccred();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkAccred();
  }

  private doSend() {
    if (this.auth.isStaff) {
      if (this.accred.accredId) {
        Swal.fire('Permission manquante', 'Impossible de modifier une accréditation.', 'success');
        this.sending = false;
      } else {
        Swal.fire({
          titleText: 'Clé de délégation nécessaire',
          html: '<p>Pour continuer, merci de saisir une clé de délégation.<br>Pour obtenir une clé de délégation, contactez un membre du comité ou le PC</p>',
          input: 'text',
          inputValidator: (inputValue: string) => isNullOrUndefined(inputValue.match(/^[A-Fa-f0-9-]{2,20}$/)) && 'Format invalide',
          showCancelButton: true,
          showConfirmButton: true
        }).then(res => {
          if (res.value && res.value.trim() !== '') {
            this.subscribeToResult(this.service.createAccredDelegated(this.accred, res.value.trim()));
          } else {
            this.sending = false;
          }
        });
      }
    } else {
      this.subscribeToResult(this.service.createUpdateAccred(this.accred));
    }

  }

  private subscribeToResult(obs: Observable<number>) {
    if (!this.isValid) {
      this.sending = false;
      return;
    }

    obs.subscribe(succ => {
      const word = this.accred.accredId ? 'modifiée' : 'créée';
      if (this.successPopup) {
        Swal.fire('Accréditation ' + word, undefined, 'success');
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
