import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityaddkeyComponent } from './identityaddkey.component';

describe('IdentityaddkeyComponent', () => {
  let component: IdentityaddkeyComponent;
  let fixture: ComponentFixture<IdentityaddkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityaddkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityaddkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
