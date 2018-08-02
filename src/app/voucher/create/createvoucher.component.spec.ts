import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoucherComponent } from './createvoucher.component';

describe('CreateVoucherComponent', () => {
  let component: CreateVoucherComponent;
  let fixture: ComponentFixture<CreateVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
