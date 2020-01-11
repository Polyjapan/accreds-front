import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Accred, FullAccred, statusToString} from '../../data/accred';
import {AccredsService} from '../../services/accreds.service';
import {MatDialog} from '@angular/material';
import {UpdateAccredModalComponent} from '../update-accred-modal/update-accred-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accreds-list',
  templateUrl: './accreds-list.component.html',
  styleUrls: ['./accreds-list.component.css']
})
export class AccredsListComponent implements OnInit {
  accreds: Observable<FullAccred[]>;
  statusToString = statusToString;
  columns = ['name', 'bodyName', 'stageName', 'accredType', 'accredStatus', 'actions'];


  constructor(private service: AccredsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.accreds = this.service.getAccredsContinuous();
  }

  update(id: number) {
    this.dialog.open(UpdateAccredModalComponent, {data: id});
  }

  deleting: number = undefined;

  delete(accred: Accred) {
    const name = (accred.firstname && accred.lastname) ? (accred.firstname + ' ' + accred.lastname) : (accred.stageName ? accred.stageName : (accred.bodyName ? accred.bodyName : 'Anone Yme'));

    this.deleting = accred.accredId;

    Swal.fire({
      input: 'text',
      inputValidator: (inputValue: string) => {
        return (!inputValue || inputValue !== name) && 'Merci de saisir la valeur demandée';
      },
      titleText: 'Confirmer votre action',
      html: 'Vous êtes sur le point de supprimer une accréditation. Si c\'est bien ce que vous voulez faire, ' +
        'tapez <b>' + name + '</b> dans la boite ci dessous',
      showConfirmButton: true,
      showCancelButton: true
    }).then(result => {
      if (result && result.value && result.value === name) {
        this.service.deleteAccred(accred.accredId).subscribe(res => {
          this.service.updateContinuousAccreds();
          this.deleting = undefined;
        }, err => {
          Swal.fire('Erreur inconnue', 'Impossible de supprimer cette accréditation. Réessayez plus tard.', 'error');
          this.deleting = undefined;
        });
      } else {
        this.deleting = undefined;
      }
    });
  }
}


