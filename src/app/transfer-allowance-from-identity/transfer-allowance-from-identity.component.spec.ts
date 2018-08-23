import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAllowanceFromIdentityComponent } from './transfer-allowance-from-identity.component';

describe('TransferAllowanceFromIdentityComponent', () => {
  let component: TransferAllowanceFromIdentityComponent;
  let fixture: ComponentFixture<TransferAllowanceFromIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferAllowanceFromIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAllowanceFromIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
