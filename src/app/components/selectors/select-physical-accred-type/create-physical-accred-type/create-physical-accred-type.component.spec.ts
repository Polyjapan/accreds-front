import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhysicalAccredTypeComponent } from './create-physical-accred-type.component';

describe('CreatePhysicalAccredTypeComponent', () => {
  let component: CreatePhysicalAccredTypeComponent;
  let fixture: ComponentFixture<CreatePhysicalAccredTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhysicalAccredTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhysicalAccredTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
