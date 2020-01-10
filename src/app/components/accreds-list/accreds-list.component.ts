import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Accred, FullAccred, statusToString} from '../../data/accred';
import {AccredsService} from '../../services/accreds.service';
import {AccredTypesService} from '../../services/accredTypes.service';
import {map, switchMap} from 'rxjs/operators';
import {FullAccredType} from '../../data/accredType';

@Component({
  selector: 'app-accreds-list',
  templateUrl: './accreds-list.component.html',
  styleUrls: ['./accreds-list.component.css']
})
export class AccredsListComponent implements OnInit {
  accreds: Observable<FullAccred[]>;
  statusToString = statusToString;
  columns = ['name', 'bodyName', 'stageName', 'accredType', 'accredStatus'];


  constructor(private service: AccredsService, private types: AccredTypesService) { }

  ngOnInit() {
    this.accreds = this.service.getAccredsContinuous();
  }

}


