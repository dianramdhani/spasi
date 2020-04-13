import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProfileV7Component } from './site-profile-v7.component';

describe('SiteProfileV7Component', () => {
  let component: SiteProfileV7Component;
  let fixture: ComponentFixture<SiteProfileV7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteProfileV7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProfileV7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
