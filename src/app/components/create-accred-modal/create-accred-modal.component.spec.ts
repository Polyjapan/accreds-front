import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccredModalComponent } from './create-accred-modal.component';

describe('CreateAccredModalComponent', () => {
  let component: CreateAccredModalComponent;
  let fixture: ComponentFixture<CreateAccredModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccredModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccredModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
