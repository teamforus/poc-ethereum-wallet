import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesPageNavComponent } from './currencies-page-nav.component';

describe('CurrenciesPageNavComponent', () => {
  let component: CurrenciesPageNavComponent;
  let fixture: ComponentFixture<CurrenciesPageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenciesPageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenciesPageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
