import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewkeyComponent } from './newkey.component';

describe('NewkeyComponent', () => {
  let component: NewkeyComponent;
  let fixture: ComponentFixture<NewkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
