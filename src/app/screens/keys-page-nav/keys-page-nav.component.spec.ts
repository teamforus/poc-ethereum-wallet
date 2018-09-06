import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysPageNavComponent } from './keys-page-nav.component';

describe('KeysPageNavComponent', () => {
  let component: KeysPageNavComponent;
  let fixture: ComponentFixture<KeysPageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysPageNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysPageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
