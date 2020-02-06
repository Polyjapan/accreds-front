import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Accred, AccredStatus, FullAccred, statusToString} from '../../data/accred';
import {AccredsService} from '../../services/accreds.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {UpdateAccredModalComponent} from '../update-accred-modal/update-accred-modal.component';
import Swal from 'sweetalert2';
import {AccredStaffDetailsComponent} from '../accred-staff-details/accred-staff-details.component';
import {AccredHistoryModalComponent} from '../accred-history-modal/accred-history-modal.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-accreds-list',
  templateUrl: './accreds-list.component.html',
  styleUrls: ['./accreds-list.component.css']
})
export class AccredsListComponent implements OnInit {
  accreds: MatTableDataSource<FullAccred> = new MatTableDataSource([]);
  statusToString = statusToString;
  AccredStatus = AccredStatus;


  @Input() viewType: 'admin' | 'staff';

  columnsAdmin = ['name', 'bodyName', 'stageName', 'accredType', 'preferedDesk', 'particularities', 'author', 'adminActions'];
  columnsStaff = ['name', 'bodyName', 'stageName', 'accredType', 'author', 'accredStatus', 'particularities', 'staffActions'];

  deleting: number = undefined;

  filterName: string;
  filterAccredType: number;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: AccredsService, private dialog: MatDialog) {
  }

  dataAccessor(data: FullAccred, col: string) {
    switch (col) {
      case 'name':
        return data.accred.firstname + ' ' + data.accred.lastname;
      case 'bodyName':
        return data.accred.bodyName;
      case 'stageName':
        return data.accred.stageName;
      case 'accredType':
        return data.type ? data.type.accredType.accredTypeName : 'Chargement...';
      case 'preferedDesk':
        return data.desk;
      case 'accredStatus':
        return statusToString(data.accred.status);
      case 'author':
        return data.author ? data.author.details.firstName + ' ' + data.author.details.lastName : 'Chargement...';
      case 'authorPhone':
        return data.author ? data.author.details.phoneNumber : 'Chargement...';
    }
  }

  applyFilter() {
    this.accreds.filter = this.filterAccredType || this.filterName ? 'enabled' : undefined;
  }

  export() {
    const header = 'Nom,Prénom,Nom de scène,Organisme,Type d\'accred,Accred physique';
    const content = this.accreds.filteredData
      .map(data => data.accred.lastname + ',' + data.accred.firstname + ',' + data.accred.stageName + ',' +
        data.accred.bodyName + ',' + data.type.accredType.accredTypeName + ',' + data.type.physicalAccredType.physicalAccredTypeName)
      .join('\n');

    const blob = new Blob([header + '\n' + content], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, 'accreds.csv');
  }

  ngOnInit() {
    this.accreds.sort = this.sort;
    this.accreds.sortingDataAccessor = this.dataAccessor;
    this.accreds.filterPredicate = (data: FullAccred, _: string) => {
      if (this.filterAccredType && data.accred.accredTypeId !== this.filterAccredType) {
        return false;
      }

      if (!this.filterName) {
        return true;
      }

      const name = data.accred.firstname + ' ' + data.accred.lastname;
      const filter = this.filterName.toLowerCase().trim();

      return name.toLowerCase().includes(filter) ||
        data.accred.bodyName.toLowerCase().includes(filter) || data.accred.stageName.toLowerCase().includes(filter);
    };

    this.service.getAccredsContinuous()
      .subscribe(data => this.accreds.data = data);
  }

  update(id: number) {
    this.dialog.open(UpdateAccredModalComponent, {data: id});
  }

  history(accred: Accred) {
    this.dialog.open(AccredHistoryModalComponent, {data: accred});
  }

  delete(accred: Accred) {
    const name = (accred.firstname && accred.lastname) ?
      (accred.firstname + ' ' + accred.lastname) : (accred.stageName ?
        accred.stageName : (accred.bodyName ? accred.bodyName : 'Anone Yme'));

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

  view(element: FullAccred) {
    this.dialog.open(AccredStaffDetailsComponent, {data: element});
  }
}


