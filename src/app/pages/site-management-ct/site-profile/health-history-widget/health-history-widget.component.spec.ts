import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHistoryWidgetComponent } from './health-history-widget.component';

describe('HealthHistoryWidgetComponent', () => {
  let component: HealthHistoryWidgetComponent;
  let fixture: ComponentFixture<HealthHistoryWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthHistoryWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthHistoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
