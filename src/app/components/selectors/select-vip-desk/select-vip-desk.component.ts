import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {isNumber} from 'util';
import {AccredType} from '../../../data/accredType';
import {AccredTypesService} from '../../../services/accredTypes.service';
import {CreateVipDeskComponent} from './create-vip-desk/create-vip-desk.component';
import {VipDesk} from '../../../data/vipDesk';
import {VipDesksService} from '../../../services/vipDesks.service';

@Component({
  selector: 'app-select-vip-desk',
  templateUrl: './select-vip-desk.component.html',
  styleUrls: ['./select-vip-desk.component.css']
})
export class SelectVipDeskComponent implements OnInit {
  @Input() label = 'Entrée VIP préférée';
  @Input() allowCreation = false;

  @Input() selected: number;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() selectedDeskChange = new EventEmitter<VipDesk>();

  desks: VipDesk[] = [];

  constructor(private service: VipDesksService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getVipDesks().subscribe(desks => this.desks = desks);
  }

  changeValue($event) {
    this.selectedChange.emit($event);
    this.selectedDeskChange.emit(this.desks.filter(l => l.vipDeskId === $event)[0]);
  }

  create() {
    this.dialog.open(CreateVipDeskComponent).afterClosed().subscribe(res => {
      if (isNumber(res)) {
        this.service.forceRefresh().subscribe(ans => {
          this.selected = res;
          this.changeValue(res);
        });
      }
    });
  }
}
