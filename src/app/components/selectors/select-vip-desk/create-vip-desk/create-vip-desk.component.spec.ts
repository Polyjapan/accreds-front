import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVipDeskComponent } from './create-vip-desk.component';

describe('CreateAccredTypeComponent', () => {
  let component: CreateVipDeskComponent;
  let fixture: ComponentFixture<CreateVipDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVipDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVipDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
