import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTokenFromIdentityComponent } from './transfer-token-from-identity.component';

describe('TransferTokenFromIdentityComponent', () => {
  let component: TransferTokenFromIdentityComponent;
  let fixture: ComponentFixture<TransferTokenFromIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTokenFromIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTokenFromIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
