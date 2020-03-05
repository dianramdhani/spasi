import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCompareComponent } from './sensor-compare.component';

describe('SensorCompareComponent', () => {
  let component: SensorCompareComponent;
  let fixture: ComponentFixture<SensorCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
