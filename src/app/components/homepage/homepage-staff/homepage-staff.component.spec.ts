import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStaffComponent } from './homepage-staff.component';

describe('HomepageStaffComponent', () => {
  let component: HomepageStaffComponent;
  let fixture: ComponentFixture<HomepageStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
