import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccredTypeComponent } from './select-accred-type.component';

describe('SelectLenderComponent', () => {
  let component: SelectAccredTypeComponent;
  let fixture: ComponentFixture<SelectAccredTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAccredTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccredTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
