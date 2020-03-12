import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProfileV3Component } from './site-profile-v3.component';

describe('SiteProfileV3Component', () => {
  let component: SiteProfileV3Component;
  let fixture: ComponentFixture<SiteProfileV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProfileV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProfileV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
