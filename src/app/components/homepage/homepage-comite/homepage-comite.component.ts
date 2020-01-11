import { Component, OnInit } from '@angular/core';
import {CreateAccredModalComponent} from '../../create-accred-modal/create-accred-modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-homepage-comite',
  templateUrl: './homepage-comite.component.html',
  styleUrls: ['./homepage-comite.component.css']
})
export class HomepageComiteComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  createAccred() {
    this.dialog.open(CreateAccredModalComponent);
  }
}
