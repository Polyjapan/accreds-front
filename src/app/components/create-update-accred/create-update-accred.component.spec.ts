import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAccredComponent } from './create-update-accred.component';

describe('CreateUpdateAccredComponent', () => {
  let component: CreateUpdateAccredComponent;
  let fixture: ComponentFixture<CreateUpdateAccredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateAccredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAccredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
