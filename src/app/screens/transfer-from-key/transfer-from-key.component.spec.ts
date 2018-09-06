import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFromKeyComponent } from './transfer-from-key.component';

describe('TransferFromKeyComponent', () => {
  let component: TransferFromKeyComponent;
  let fixture: ComponentFixture<TransferFromKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFromKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFromKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
