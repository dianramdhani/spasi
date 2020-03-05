import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProfileV2Component } from './site-profile-v2.component';

describe('SiteProfileV2Component', () => {
  let component: SiteProfileV2Component;
  let fixture: ComponentFixture<SiteProfileV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProfileV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProfileV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
