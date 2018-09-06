import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFromIdentityComponent } from './transfer-from-identity.component';

describe('TransferFromIdentityComponent', () => {
  let component: TransferFromIdentityComponent;
  let fixture: ComponentFixture<TransferFromIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFromIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFromIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
