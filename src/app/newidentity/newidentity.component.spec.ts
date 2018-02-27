import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewidentityComponent } from './newidentity.component';

describe('NewidentityComponent', () => {
  let component: NewidentityComponent;
  let fixture: ComponentFixture<NewidentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewidentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewidentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
