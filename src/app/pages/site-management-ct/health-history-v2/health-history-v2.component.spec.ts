import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHistoryV2Component } from './health-history-v2.component';

describe('HealthHistoryV2Component', () => {
  let component: HealthHistoryV2Component;
  let fixture: ComponentFixture<HealthHistoryV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthHistoryV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthHistoryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
