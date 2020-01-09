import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccredBulkComponent } from './create-accred-bulk.component';

describe('CreateAccredBulkComponent', () => {
  let component: CreateAccredBulkComponent;
  let fixture: ComponentFixture<CreateAccredBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccredBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccredBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
