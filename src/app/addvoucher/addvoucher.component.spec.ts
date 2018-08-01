import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvoucherComponent } from './addvoucher.component';

describe('AddvoucherComponent', () => {
  let component: AddvoucherComponent;
  let fixture: ComponentFixture<AddvoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
