import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccredType, PhysicalAccredType} from '../../../data/accredType';
import {AccredTypesService} from '../../../services/accredTypes.service';
import {MatDialog} from '@angular/material';
import {CreateAccredTypeComponent} from '../select-accred-type/create-accred-type/create-accred-type.component';
import {isNumber} from "util";
import {PhysicalAccredTypesService} from '../../../services/physicalAccredTypes.service';
import {CreatePhysicalAccredTypeComponent} from './create-physical-accred-type/create-physical-accred-type.component';

@Component({
  selector: 'app-select-physical-accred-type',
  templateUrl: './select-physical-accred-type.component.html',
  styleUrls: ['./select-physical-accred-type.component.css']
})
export class SelectPhysicalAccredTypeComponent implements OnInit {
  @Input() label = 'Type d\'accréditation physique';
  @Input() allowCreation = false;
  @Input() allowEmpty = false;

  @Input() selected: number;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() selectedTypeChange = new EventEmitter<PhysicalAccredType>();

  types: PhysicalAccredType[] = [];

  constructor(private service: PhysicalAccredTypesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAccredTypes().subscribe(types => this.types = types);
  }

  changeValue($event) {
    this.selectedChange.emit($event);
    this.selectedTypeChange.emit(this.types.filter(l => l.physicalAccredTypeId === $event)[0]);
  }

  create() {
    this.dialog.open(CreatePhysicalAccredTypeComponent).afterClosed().subscribe(res => {
      if (isNumber(res)) {
        this.service.forceRefresh().subscribe(ans => {
          this.selected = res;
          this.changeValue(res);
        });
      }
    });
  }

}
