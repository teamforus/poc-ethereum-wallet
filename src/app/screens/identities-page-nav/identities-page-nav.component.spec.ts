import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitiesPageNavComponent } from './identities-page-nav.component';

describe('IdentitiesPageNavComponent', () => {
  let component: IdentitiesPageNavComponent;
  let fixture: ComponentFixture<IdentitiesPageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentitiesPageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentitiesPageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
