import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccredTypeMappingComponent } from './accred-type-mapping.component';

describe('AccredTypeMappingComponent', () => {
  let component: AccredTypeMappingComponent;
  let fixture: ComponentFixture<AccredTypeMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccredTypeMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccredTypeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
