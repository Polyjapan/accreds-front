import {Component, OnInit} from '@angular/core';
import {AccredTypeMapping} from '../../data/accredType';
import {AccredTypesService} from '../../services/accredTypes.service';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accred-type-mapping',
  templateUrl: './accred-type-mapping.component.html',
  styleUrls: ['./accred-type-mapping.component.css']
})
export class AccredTypeMappingComponent implements OnInit {
  accredTypes: AccredTypeMapping[];
  working = false;

  constructor(private service: AccredTypesService) {
  }

  ngOnInit(): void {
    this.reload();

    this.service.getAccredTypes()
      .pipe(map(tpes => tpes.map(t => ({
        accredType: t.accredType,
        physicalAccredType: t.physicalAccredType ? t.physicalAccredType.physicalAccredTypeId : undefined
      }))))
      .subscribe(t => this.accredTypes = t);
  }

  reload() {
    this.accredTypes = undefined;
    this.service.forceRefresh();
  }

  save() {
    if (this.working) {
      return;
    }
    this.working = true;

    this.service.pushMapping(this.accredTypes.filter(tpe => tpe.physicalAccredType)
      .map(tpe => [tpe.accredType.accredTypeId, tpe.physicalAccredType]))
      .subscribe(res => {
        Swal.fire('Sweet', 'On dirait que ça a marché.', 'success');
        this.reload();
        this.working = false;
      }, res => {
        Swal.fire('Oups', 'On dirait que ça a pas marché.', 'error');
        this.working = false;
        console.log(res);
      });
  }

}
