import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportIdentityComponent } from '@app/register/import-identity/import-identity.component';

describe('ImportidentityComponent', () => {
  let component: ImportIdentityComponent;
  let fixture: ComponentFixture<ImportIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
