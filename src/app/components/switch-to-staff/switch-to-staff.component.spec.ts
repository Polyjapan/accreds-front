import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchToStaffComponent } from './switch-to-staff.component';

describe('SwitchToStaffComponent', () => {
  let component: SwitchToStaffComponent;
  let fixture: ComponentFixture<SwitchToStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchToStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchToStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
