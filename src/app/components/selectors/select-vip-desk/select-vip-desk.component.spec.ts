import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVipDeskComponent } from './select-vip-desk.component';

describe('SelectLenderComponent', () => {
  let component: SelectVipDeskComponent;
  let fixture: ComponentFixture<SelectVipDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVipDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVipDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
