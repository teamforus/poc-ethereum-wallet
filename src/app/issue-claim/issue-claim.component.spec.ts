import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueClaimComponent } from './issue-claim.component';

describe('IssueClaimComponent', () => {
  let component: IssueClaimComponent;
  let fixture: ComponentFixture<IssueClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
