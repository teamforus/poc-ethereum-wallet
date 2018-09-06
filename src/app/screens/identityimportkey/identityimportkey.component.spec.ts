import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityimportkeyComponent } from './identityimportkey.component';

describe('IdentityimportkeyComponent', () => {
  let component: IdentityimportkeyComponent;
  let fixture: ComponentFixture<IdentityimportkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityimportkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityimportkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
