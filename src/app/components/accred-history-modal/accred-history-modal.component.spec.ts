import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccredHistoryModalComponent } from './accred-history-modal.component';

describe('AccredHistoryModalComponentComponent', () => {
  let component: AccredHistoryModalComponent;
  let fixture: ComponentFixture<AccredHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccredHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccredHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
