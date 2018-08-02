import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemVoucherComponent } from './redeemvoucher.component';

describe('RedeemVoucherComponent', () => {
  let component: RedeemVoucherComponent;
  let fixture: ComponentFixture<RedeemVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
