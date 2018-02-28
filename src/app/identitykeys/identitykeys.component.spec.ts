import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitykeysComponent } from './identitykeys.component';

describe('IdentitykeysComponent', () => {
  let component: IdentitykeysComponent;
  let fixture: ComponentFixture<IdentitykeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentitykeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentitykeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
