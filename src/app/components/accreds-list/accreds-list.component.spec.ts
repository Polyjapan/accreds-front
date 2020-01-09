import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccredsListComponent } from './accreds-list.component';

describe('AccredsListComponent', () => {
  let component: AccredsListComponent;
  let fixture: ComponentFixture<AccredsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccredsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccredsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
