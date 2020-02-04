import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPhysicalAccredTypeComponent } from './select-physical-accred-type.component';

describe('SelectPhysicalAccredTypeComponent', () => {
  let component: SelectPhysicalAccredTypeComponent;
  let fixture: ComponentFixture<SelectPhysicalAccredTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPhysicalAccredTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPhysicalAccredTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
