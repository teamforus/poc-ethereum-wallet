import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTokenFromKeyComponent } from './transfer-token-from-key.component';

describe('TransferTokenFromKeyComponent', () => {
  let component: TransferTokenFromKeyComponent;
  let fixture: ComponentFixture<TransferTokenFromKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTokenFromKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTokenFromKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
