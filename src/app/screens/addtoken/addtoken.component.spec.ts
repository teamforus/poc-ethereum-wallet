import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtokenComponent } from './addtoken.component';

describe('AddtokenComponent', () => {
  let component: AddtokenComponent;
  let fixture: ComponentFixture<AddtokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
