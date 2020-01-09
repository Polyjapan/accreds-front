import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccredTypeComponent } from './create-accred-type.component';

describe('CreateAccredTypeComponent', () => {
  let component: CreateAccredTypeComponent;
  let fixture: ComponentFixture<CreateAccredTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccredTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccredTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
