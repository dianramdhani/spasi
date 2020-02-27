import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHistoryWidgetV2Component } from './health-history-widget-v2.component';

describe('HealthHistoryWidgetV2Component', () => {
  let component: HealthHistoryWidgetV2Component;
  let fixture: ComponentFixture<HealthHistoryWidgetV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthHistoryWidgetV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthHistoryWidgetV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
