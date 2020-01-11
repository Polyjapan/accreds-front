import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {isNumber} from 'util';
import {AccredType} from '../../../data/accredType';
import {AccredTypesService} from '../../../services/accredTypes.service';
import {CreateAccredTypeComponent} from './create-accred-type/create-accred-type.component';

@Component({
  selector: 'app-select-accred-type',
  templateUrl: './select-accred-type.component.html',
  styleUrls: ['./select-accred-type.component.css']
})
export class SelectAccredTypeComponent implements OnInit {
  @Input() label = 'Type d\'accréditation';
  @Input() allowCreation = false;
  @Input() allowEmpty = false;

  @Input() selected: number;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() selectedTypeChange = new EventEmitter<AccredType>();

  types: AccredType[] = [];

  constructor(private service: AccredTypesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAccredTypes().subscribe(types => this.types = types.map(a => a.accredType));
  }

  changeValue($event) {
    this.selectedChange.emit($event);
    this.selectedTypeChange.emit(this.types.filter(l => l.accredTypeId === $event)[0]);
  }

  create() {
    this.dialog.open(CreateAccredTypeComponent).afterClosed().subscribe(res => {
      if (isNumber(res)) {
        this.service.forceRefresh().subscribe(ans => {
          this.selected = res;
          this.changeValue(res);
        });
      }
    });
  }
}
