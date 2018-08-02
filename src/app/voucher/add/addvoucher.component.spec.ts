import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoucherComponent } from './addvoucher.component';

describe('AddVoucherComponent', () => {
  let component: AddVoucherComponent;
  let fixture: ComponentFixture<AddVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
