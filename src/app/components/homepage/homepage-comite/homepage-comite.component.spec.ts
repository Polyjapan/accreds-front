import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComiteComponent } from './homepage-comite.component';

describe('HomepageComiteComponent', () => {
  let component: HomepageComiteComponent;
  let fixture: ComponentFixture<HomepageComiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageComiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
