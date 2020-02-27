import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHistoryWidgetV3Component } from './health-history-widget-v3.component';

describe('HealthHistoryWidgetV3Component', () => {
  let component: HealthHistoryWidgetV3Component;
  let fixture: ComponentFixture<HealthHistoryWidgetV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthHistoryWidgetV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthHistoryWidgetV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
