import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIdentityComponent } from '@app/register/new-identity/new-identity.component';

describe('NewidentityComponent', () => {
  let component: NewIdentityComponent;
  let fixture: ComponentFixture<NewIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
