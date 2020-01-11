import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccredModalComponent } from './update-accred-modal.component';

describe('UpdateAccredModalComponent', () => {
  let component: UpdateAccredModalComponent;
  let fixture: ComponentFixture<UpdateAccredModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccredModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccredModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
