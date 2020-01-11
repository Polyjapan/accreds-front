import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccredStaffDetailsComponent } from './accred-staff-details.component';

describe('AccredStaffDetailsComponent', () => {
  let component: AccredStaffDetailsComponent;
  let fixture: ComponentFixture<AccredStaffDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccredStaffDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccredStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
